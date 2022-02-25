/// <reference path="../@types/vader-sentiment.d.ts" />
import vaderSentiment from "vader-sentiment";
import fs from "fs";
import CsvParser from "csv-parser";
import path, { resolve } from "path";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

// Local interfaces
import { article, mediaOutlet } from "../@types/media";


// Constants
const dataVersion: number = 2;
dotenv.config({path: path.resolve(__dirname, '../.env')});


const getOutletList = async (): Promise<mediaOutlet[]> => { // Gets list containing all media outlets present in the 'Media Outlets.csv' File
  return new Promise((resolve, reject)=>{ 
    var outletList: mediaOutlet[] = []; // Array containing all present media outlets
    fs.createReadStream(path.resolve(__dirname, `../data/${dataVersion}/Media Outlets.csv`))
    .pipe(CsvParser())
    .on('data', function(data){
        outletList.push({name: data.outletName, rssLink: data.RSSLink, articleList: [], existingArticleList: []}); // Add each line to the array 
    })
    .on('end',function(){
        resolve(outletList);
    });  
  })
}

const getArticles = async (outletName:string): Promise<article[]> => { // Get all the articles present for an outlet and compute the sentiment score
  return new Promise((resolve, reject)=>{
    var articleList: article[] = []; // Array containig each article for specific outlet
    if(fs.existsSync(path.resolve(__dirname, `../data/${dataVersion}/csv/${outletName}.csv`))){ // Ensure outlets file exists
      fs.createReadStream(path.resolve(__dirname, `../data/${dataVersion}/csv/${outletName}.csv`), "utf-8")
      .pipe(CsvParser())
      .on('data', function(data){
          var thisSentimentScore: number =vaderSentiment.SentimentIntensityAnalyzer.polarity_scores(data.headline)["compound"]; // Generate sentiment score
          articleList.push({outletName: outletName,
                            isLegacy: true, 
                            headline: data.headline, 
                            description: data.description,
                            author: data.author,
                            publishDate: new Date(data.date),
                            sentimentScore: thisSentimentScore});
    })
    .on('end', ()=>{
      resolve(articleList); // Return array
    })
    }else{ // If file is not found for specific outlet
      console.log(`File Not Found for outlet ${outletName}`);
      reject(`File Not Found for outlet ${outletName}`);
    }
  });
}

(async () => { // Actually run some code
  const dbClient = new MongoClient(process.env.DB_URI as string);

  // Get array containing each tracked outlet
  const outletList: mediaOutlet[] = await getOutletList();
  // Get array with each article for each outlet
  for(var i:number=0; i<outletList.length; i++){
    outletList[i]["articleList"] = await getArticles(outletList[i]["name"])
    console.log(`${i+ 1}/${outletList.length}`)
  }
  // Upload data to db
  console.log("CONNECTING TO DATABASE");
  dbClient.connect(async err =>{
    const articleCollection = dbClient.db(process.env.DB_NAME as string).collection("newsData");
    const outletCollection = dbClient.db(process.env.DB_NAME as string).collection("outletsList");
    var articleCount: number = 0; // Track how many articles are uploaded
    for(var i:number=0; i<outletList.length; i++){
      console.log(`Starting ${i + 1} of ${outletList.length}`)
      outletCollection.insertOne({"outletName": outletList[i]["name"], "rssLink": outletList[i]["rssLink"]})
      for(var aI: number = 0; aI<outletList[i]["articleList"].length; aI++){
        var a = await articleCollection.insertOne(outletList[i]["articleList"][aI])
        articleCount += 1;
      }
    }
    console.log(`Uploaded ${articleCount} articles`);
  })
  console.log("FINISHED UPLOADING")
})();

