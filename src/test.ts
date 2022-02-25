/// <reference path="../@types/vader-sentiment.d.ts" />
import vaderSentiment from "vader-sentiment";
import Parser from 'rss-parser';
import { MongoClient, ServerApiVersion } from "mongodb";
import path, { resolve } from 'path';
import dotenv from "dotenv";


// Local interfaces
import { article, mediaOutlet, rssReply, existingArticle } from "../@types/media";

dotenv.config({ path: path.resolve(__dirname, "../.env")});

type CustomFeed = {foo: string};

const rssParser: Parser<CustomFeed, rssReply> = new Parser();
const dbClient = new MongoClient(process.env.DB_URI as string);

(async () => {
    // Get list off outlets to search
    const outletList: mediaOutlet[] = await dbClient.connect().then(async response=>{
      var outletCollection = dbClient.db(process.env.DB_NAME as string).collection("outletsList");
      var articleCollection = dbClient.db(process.env.DB_NAME as string).collection("newsData")
      const innerOutletList: mediaOutlet[] = [];
      const outletAggregate = await outletCollection.aggregate([
        {
          '$project': {
            'outletName': 1, 
            'RSSLink': 1
          }
        }
      ])
      await outletAggregate.forEach((obj)=>{
        innerOutletList.push({"name": obj.outletName as string,
                        "rssLink": obj.RSSLink as string,
                        "articleList": [],
                        "existingArticleList": []});
      });
      /*
      Using Articles found above, find all the articles
      published between x days ago and now, to make sure 
      the same article isn't written multiple times
      */
      var oldDate: Date = new Date();
      oldDate.setDate(oldDate.getDate() - (process.env.SCAN_BACK_DAYS as unknown as number));
      // TODO Delete line below
      oldDate = new Date("01 Jan 1970 00:00:00 GMT")
      for(var i:number = 0; i<innerOutletList.length; i++){
        var thisArticleAggregate = await articleCollection.aggregate([
          {
            '$match': {
              'outletName': innerOutletList[i]["name"], 
              'publishDate': {
                '$gte': oldDate
              }
            }
          }, {
            '$project': {
              'headline': 1,
              'author': 1
            }
          }
        ]);
        await thisArticleAggregate.forEach((art)=>{
          innerOutletList[i]["existingArticleList"]?.push({
            headline: art.headline as string,
            author: art.author as string
          })
        });
      }

      dbClient.close();
      return innerOutletList
    });
    console.log("DONE")
    
    // Iterate through each media outlet and get current article data
    var aCount: number = 0;
    for(var i:number=0; i<outletList.length; i++){
      console.log(`${i+1}/${outletList.length}`)
      var thisArticleList = await rssParser.parseURL(outletList[i].rssLink);
      thisArticleList.items.forEach(rs =>{
        aCount += 1;
        var thisScore: number = vaderSentiment.SentimentIntensityAnalyzer.polarity_scores(rs.title)["compound"];
        outletList[i]["articleList"].push({
          "outletName": outletList[i]["name"],
          "headline": rs.title,
          "description": rs.contentSnippet,
          "author": rs.creator,
          "publishDate": new Date(rs.isoDate as string),
          "isLegacy": false,
          "sentimentScore": thisScore,
          "linkToArticle": rs.link,
          "catergories": rs.categories,
        });
      });
    }
    console.log(`Total articles counted = ${aCount}`)
    
    /*
    Compare existing article list with current article list 
    and then upload the non-duplicates
    */
  //  var toUploadList: article[] = [] 
  //  for(var i:number=0; i<outletList.length; i++){
  //    console.log(`${i+1}/${outletList.length}`)
  //    for(var articleCount=0; articleCount<outletList.length; articleCount++){
  //      var foundCopy: boolean = false;
  //      for(var exArtCount:number = 0; exArtCount > outletList[i]["existingArticleList"]?.length; exArtCount++){
  //        console.log(outletList[i]["existingArticleList"][exArtCount]["headline"])
  //        if (outletList[i]["existingArticleList"][exArtCount]["headline"] == outletList[i]["articleList"][articleCount]["headline"]){
  //          foundCopy = true;
  //          break;
  //         }
  //       }
  //       if(!foundCopy){
  //         console.log(outletList[i]["articleList"][articleCount])
  //         toUploadList.push(outletList[i]["articleList"][articleCount]);
  //       }
  //     }
  //   }
  //   console.log(`Total unique articles found = ${toUploadList.length}`)
    

    /*
    And finally, upload the unique articles to MongoDB
    */
  
  dbClient.connect(async err =>{
    const articleCollection = dbClient.db(process.env.DB_NAME as string).collection("newsData");
    // for(var i:number =0; i<outletList.length; i++){
    //   if(articleCollection.find({"headline"}))
    // }
    }
  });
  // dbClient.connect(async err =>{
  //   const articleCollection = dbClient.db(process.env.DB_NAME as string).collection("newsData");
  //   for(var i:number=0; i<toUploadList.length; i++){
  //     if (toUploadList[i] == null){
  //       //await articleCollection.insertOne(toUploadList[i]);
  //       console.log(toUploadList[i])
  //     }
  //   }
  // });
  console.log("FINISHED UPLOADING HAVE A GREAT DAY")
})();
