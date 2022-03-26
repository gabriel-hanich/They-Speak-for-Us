const express = require('express');
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const { MongoClient } = require('mongodb');


export class datePeriod{
  public date: string;
  private totalVal: number;
  public valCount: number;

  constructor(date: string){
      this.date = date;
      this.totalVal = 0
      this.valCount = 0
  }

  addToDataList(val: number){
      this.totalVal += val
      this.valCount += 1
  }

  calcAvg():number{
      return this.totalVal / this.valCount
  }


}

dotenv.config({ path: path.resolve(__dirname, "../settings.env")});

const app = express();
const port = 3000;
const dbClient = new MongoClient(process.env.DB_URI)
dbClient.connect()

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

function getAggregationData(startDate: Date, endDate: Date): Array<Object>{
    return [
      {
        '$match': {
          'publishDate': {
            '$gt': startDate
          }
        }
      }, {
        '$match': {
          'publishDate': {
            '$lt': endDate
          }
        }
      }, {
        '$sort': {
          'publishDate': 1
        }
      }, {
        '$project': {
          'sentimentScore': 1, 
          'publishDate': 1, 
          'outletName': 1
        }
      }
    ]
};

  
app.get('/article_count', async (req,res) => {
    // Calculate how many articles there are in the DB
    var countCollection = dbClient.db(process.env.DB_NAME).collection("newsData");
    var dbData = await countCollection.count();
    res.send(dbData.toString())
});

app.get("/outlet_list",async (req,res) => {
  var outletCollection = dbClient.db(process.env.DB_NAME).collection("outletsList");
  var outletData = await outletCollection.aggregate([{'$project': {'outletName': 1}}]).toArray();
  res.send(outletData)
})

app.get("/data/:startDate/:endDate", async (req, res)=>{ // Get average daily sentiment per day between two dates
  if(!isNaN(new Date(req.params.startDate).getTime()) && !isNaN(new Date(req.params.endDate).getTime())){ // Check both dates are valid
    var thisAggregate = getAggregationData(new Date(req.params.startDate), new Date(req.params.endDate));
    var sentimentCollection = dbClient.db(process.env.DB_NAME).collection("newsData");
    await sentimentCollection.aggregate(thisAggregate).toArray((err, results)=>{
        var dayDict: Object = {}
        for(var i:number=0; i<results.length; i++){
          if(dayDict[results[i]["publishDate"].toDateString()]){
            dayDict[results[i]["publishDate"].toDateString()].addToDataList(results[i]["sentimentScore"])
          }else{
            dayDict[results[i]["publishDate"].toDateString()] = new datePeriod(results[i]["publishDate"].toDateString())
            dayDict[results[i]["publishDate"].toDateString()].addToDataList(results[i]["sentimentScore"])
          }
        }
        var avgSentimentList: Array<Object> = [] 
        for(var i:number=0; i<Object.values(dayDict).length; i++){
          avgSentimentList.push({"date": Object.keys(dayDict)[i], "score": Object.values(dayDict)[i].calcAvg(), "count": Object.values(dayDict)[i].valCount})
        }
        res.send(avgSentimentList)
    });
  }else{
    res.send("The date(s) provided are invalid")
  }

});


app.get("/data/advanced/:startDate/:endDate/:outletName/:headlineList", async(req, res)=>{
  res.send("HI")
})

app.listen(port, () => {
    console.log(`Server listening on the port: ${port}`);
});

dbClient.close()