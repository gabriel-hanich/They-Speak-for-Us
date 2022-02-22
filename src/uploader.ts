/// <reference path="../@types/vader-sentiment.d.ts" />
import vaderSentiment from "vader-sentiment";
import fs from "fs";
import CsvParser from "csv-parser";
import path, { resolve } from "path";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

const dataVersion: number = 2;
dotenv.config({path: path.resolve(__dirname, '../.env')});

interface article{
  isLegacy: boolean,
  headline:string,
  description: string,
  author: string,
  publishDate: Date,
  sentimentScore?: number,
  // Modern article data points below, legacy and modern data points above
  linkToArticle?: string,
  imageURL?: string
  catergories?: string[],
}


interface mediaOutlet{
  name: string,
  rssLink:string,
  articleList: article[]
}


const getOutletList = async (): Promise<mediaOutlet[]> => { // Gets list containing all media outlets present in the 'Media Outlets.csv' File
  return new Promise((resolve, reject)=>{ 
    var outletList: mediaOutlet[] = [];
    fs.createReadStream(path.resolve(__dirname, `../data/${dataVersion}/Media Outlets.csv`))
    .pipe(CsvParser())
    .on('data', function(data){
        try {
            outletList.push({name: data.outletName, rssLink: data.RSSLink, articleList: []})
        }
        catch(err) {
            //error handler
        }
    })
    .on('end',function(){
        resolve(outletList)
    });  
  })
}

const getArticles = async (outletName:string): Promise<article[]> => { // Get all the articles present for an outlet and compute the sentiment score
  return new Promise((resolve, reject)=>{
    var articleList: article[] = [];
    if(fs.existsSync(path.resolve(__dirname, `../data/${dataVersion}/csv/${outletName}.csv`))){
      fs.createReadStream(path.resolve(__dirname, `../data/${dataVersion}/csv/${outletName}.csv`), "utf-8")
      .pipe(CsvParser())
      .on('data', function(data){
          try {
            var thisSentimentScore: number =vaderSentiment.SentimentIntensityAnalyzer.polarity_scores(data.headline)["compound"]; 
            articleList.push({isLegacy: true, 
                              headline: data.headline, 
                              description: data.description,
                              author: data.author,
                              publishDate: new Date(data.date),
                              sentimentScore: thisSentimentScore})
          }
          catch(err) {
              //error handler
          }
    })
    .on('end', ()=>{
      resolve(articleList);
    })
    }else{
      reject(`File Not Found for outlet ${outletName}`)
    }
  });
}

(async () => {
  const dbClient = new MongoClient(process.env.DB_URI as string)

  const outletList: mediaOutlet[] = await getOutletList();
  for(var i:number=0; i<outletList.length; i++){
    outletList[i]["articleList"] = await getArticles(outletList[i]["name"])
    console.log(`${i+ 1}/${outletList.length}`)
  }
  console.log("CONNECTING TO DATABASE");
  dbClient.connect(err =>{
    for(var i:number=0; i<outletList.length; i++){
      console.log(`Starting ${i + 1} of ${outletList.length}`)
      const dbCollection = dbClient.db("test").collection(outletList[i]["name"]);
      for(var aI: number = 0; aI<outletList[i]["articleList"].length; aI++){
        var a = dbCollection.insertOne(outletList[i]["articleList"][aI])
      }
    }
  })
})();

