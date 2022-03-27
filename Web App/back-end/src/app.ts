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

function getBasicAggregationPipeline(startDate: Date, endDate: Date): Array<Object>{
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

function getAdvancedAggrgationPipeline(startDate: Date, endDate: Date, outletName: string, headlineList: Array<string>){
  if(outletName == "Any"){ // If there is no user-specified outlet
    return [
      {
        '$match': {
          'publishDate': {
            '$gt': startDate
          },
          headline: headlineList.join("|")
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
  }else{
    return [
      {
        '$match': {
          'publishDate': {
            '$gt': startDate
          },
          outletName: outletName,
          headline: headlineList.join("|")
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
  }
  
}

async function getDBData(aggrgationArray: Array<Object>) {
  return new Promise(async (resolve, reject) => {
    var dataCollection = dbClient.db(process.env.DB_NAME).collection("newsData");
    await dataCollection.aggregate(aggrgationArray).toArray((err, results)=>{
      var dayDict: Object = {}
      for(var i:number=0; i<results.length; i++){
        if(dayDict[results[i]["publishDate"].toDateString()]){
          dayDict[results[i]["publishDate"].toDateString()].addToDataList(results[i]["sentimentScore"])
        }else{
          dayDict[results[i]["publishDate"].toDateString()] = new datePeriod(results[i]["publishDate"].toDateString())
          dayDict[results[i]["publishDate"].toDateString()].addToDataList(results[i]["sentimentScore"])
        }
      }
      var dataList: Array<Object> = [] 
      for(var i:number=0; i<Object.values(dayDict).length; i++){
        dataList.push({"date": Object.keys(dayDict)[i], "score": Object.values(dayDict)[i].calcAvg(), "count": Object.values(dayDict)[i].valCount})
      }
      resolve(dataList)
    });
  });
}

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
  console.log("NEW CONNECTIOn")
  if(!isNaN(new Date(req.params.startDate).getTime()) && !isNaN(new Date(req.params.endDate).getTime())){ // Check both dates are valid
    var thisAggrgate = getBasicAggregationPipeline(new Date(req.params.startDate), new Date(req.params.endDate));
    getDBData(thisAggrgate).then((data)=>{
      res.send(data)
    });

  }else{
    res.send("The provided dates are invalid")
  }
});


app.get("/data/advanced/:startDate/:endDate/:outletName/:headlineList", async(req, res)=>{
  var startDate = new Date(req.params.startDate);
  var endDate = new Date(req.params.endDate);

  var dar

  res.send([startDate, endDate]);
})

app.listen(port, () => {
    console.log(`Server listening on the port: ${port}`);
});

dbClient.close()