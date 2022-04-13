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

dotenv.config({ path: path.resolve(__dirname, "../secrets/settings.env")});

const app = express();
const port = 3000;
const dbClient = new MongoClient(process.env.DB_URI);
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
            '$gte': startDate
          }
        }
      }, {
        '$match': {
          'publishDate': {
            '$lte': endDate
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

function getAdvancedAggrgationPipeline(startDate: Date, endDate: Date, outletName: string, headlineString: string): Array<Object>{
  if(headlineString != "$none"){
    if(outletName == "Any"){ // If there is no user-specified outlet
      return [
        {
          '$match': {
            'publishDate': {
              '$gte': startDate
            },
          }
        },{
          '$match': { 
              'headline': {
                  '$regex': "(?i)" + headlineString
              }
          }
        },{
          '$match': {
            'publishDate': {
              '$lte': endDate
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
          }
        },{
          '$match': {
              'headline': {
                  '$regex': "(?i)" + headlineString
              }
          }
        },{
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
  }else{
    if(outletName == "Any"){ // If there is no user-specified outlet
      return [
        {
          '$match': {
            'publishDate': {
              '$gte': startDate
            },
          }
        }, {
          '$match': {
            'publishDate': {
              '$lte': endDate
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
              '$gte': startDate
            },
            outletName: outletName,
          }
        }, {
          '$match': {
            'publishDate': {
              '$lte': endDate
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
  
}

async function getDBData(aggrgationArray: Array<Object>, name: string, startDate: Date, endDate: Date) {
  return new Promise(async (resolve, reject) => {
    var dataCollection = dbClient.db(process.env.DB_NAME).collection("newsData");
    await dataCollection.aggregate(aggrgationArray).toArray((err, results)=>{
      var dayDict: Object = {}
      for(var i:number=0; i<results.length; i++){
        if(dayDict[results[i]["publishDate"].toDateString()]){
          dayDict[results[i]["publishDate"].toDateString()].addToDataList(results[i]["sentimentScore"]);
        }else{
          dayDict[results[i]["publishDate"].toDateString()] = new datePeriod(results[i]["publishDate"].toDateString());
          dayDict[results[i]["publishDate"].toDateString()].addToDataList(results[i]["sentimentScore"]);
        }
      }
      var dataList: Array<Object> = [];
      var currentDate = new Date(startDate.getTime());
      var dateString: string;
      while(currentDate <= endDate){
        dateString = currentDate.toDateString()
        try{
          dataList.push({"date":dateString, "score":dayDict[dateString].calcAvg(), "count": dayDict[dateString].valCount, "name": name})
        }catch(IndexError){
          dataList.push({"date":dateString, "score":0, "count": 0, "name": name})
        }
        currentDate.setDate(currentDate.getDate() + 1)

      }
      resolve(dataList)
    });
  });
}

app.get('/article_count', async (req,res) => {
    // Calculate how many articles there are in the DB
    try{
      var countCollection = dbClient.db(process.env.DB_NAME).collection("newsData");
      var dbData = await countCollection.count();
      res.send(dbData.toString())
    }catch (err){
      console.log(err);
    }
});

app.get("/outlet_list",async (req,res) => {
  var outletCollection = dbClient.db(process.env.DB_NAME).collection("outletsList");
  var outletData = await outletCollection.aggregate([{'$project': {'outletName': 1}}]).toArray();
  res.send(outletData)
})

app.get("/data/:startDate/:endDate", async (req, res)=>{ // Get average daily sentiment per day between two dates
  if(!isNaN(new Date(req.params.startDate).getTime()) && !isNaN(new Date(req.params.endDate).getTime())){ // Check both dates are valid
    var thisAggrgate = getBasicAggregationPipeline(new Date(req.params.startDate), new Date(req.params.endDate));
    getDBData(thisAggrgate, "Any", new Date(req.params.startDate), new Date(req.params.endDate)).then((data)=>{
      res.send(data)
    });

  }else{
    res.send("The provided dates are invalid")
  }
});


app.get("/data/advanced/:startDate/:endDate/:outletName/:headlineList/:name", async(req, res)=>{ // Get advanced search data
  var startDate = new Date(req.params.startDate);
  var endDate = new Date(req.params.endDate);
  var headlineString: string;
  if(req.params.headlineList != "$none"){
    headlineString = req.params.headlineList.replace(",", "|");
    headlineString = headlineString.slice(0, -1)
  }else{
    headlineString = "$none"
  }
  var aggrgetionPipeLine: Array<Object> = getAdvancedAggrgationPipeline(startDate, endDate, req.params.outletName, headlineString);
  getDBData(aggrgetionPipeLine, req.params.name, startDate, endDate).then((data)=>{
    res.send(data);
  })
});

app.get("/search/:searchText/:sortParam/:sortOrder/:retrieveCount",async (req, res) => {
  var searchText: string = req.params.searchText;
  var sortParam: string = req.params.sortParam;
  var sortOrder: number = parseInt(req.params.sortOrder);
  var retrieveCount: number = parseInt(req.params.retrieveCount)
  var dataCollection = dbClient.db(process.env.DB_NAME).collection("newsData");
  var searchAggregate: Array<Object> = [
    {
      '$match': {
        'headline': {
          '$regex': "(?i)" + searchText
        }
      }
    }, {
      '$project': {
        'outletName': 1, 
        'headline': 1, 
        'description': 1, 
        'author': 1, 
        'publishDate': 1, 
        'sentimentScore': 1,
        'linkToArticle': 1
      }
    }];
  var sortDict = {}
  sortDict[sortParam] = sortOrder 
  searchAggregate.push({"$sort": sortDict});
  searchAggregate.push({"$limit": retrieveCount});
  await dataCollection.aggregate(searchAggregate).toArray((err, data)=>{
    res.send(data);
  })
});

app.listen(port, () => {
    console.log(`Server listening on the port: ${port}`);
});
