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
    };
    console.log(`Total articles counted = ${aCount}`)
    
  
    /*
    And finally, upload the unique articles to MongoDB
    */
  var uploadCount:number = 0; 
  dbClient.connect().then(async response =>{
    const articleCollection = dbClient.db(process.env.DB_NAME as string).collection("newsData");
    for(var i:number = 0; i<outletList.length; i++){
      for(var k:number = 0; k<outletList[i]["articleList"].length; k++){
        var a = await articleCollection.find({outletName: { $exists: true, $eq: outletList[i]["name"] }, headline:{ $exists: true, $eq: outletList[i]["articleList"][k]["headline"]}});
        if ((await a.toArray()).length == 0){
          await articleCollection.insertOne(outletList[i]["articleList"][k]);
          uploadCount += 1
        }
      }
    }
  
  });
  

  console.log(`Finished Uploading ${uploadCount} articles, have a great day`)
})();
