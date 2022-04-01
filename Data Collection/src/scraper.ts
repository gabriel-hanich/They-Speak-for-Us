/*
Reads RSS Data for each outlet present in the data base,
then uploads unique outlet to the DB
*/
/// <reference path="../@types/vader-sentiment.d.ts" />
import * as vaderSentiment from "vader-sentiment";
import Parser from 'rss-parser';
import { MongoClient, ServerApiVersion } from "mongodb";
import * as path from 'path';
import * as dotenv from "dotenv";
import * as fs from "fs";

// Local interfaces
import { article, mediaOutlet, rssReply } from "../@types/media";


dotenv.config({ path: path.resolve(__dirname, "../settings.env")});

type CustomFeed = {foo: string};


const rssParser: Parser<CustomFeed, rssReply> = new Parser(); // Used to get rss feed data
const dbClient = new MongoClient(process.env.DB_URI as string); // Used to connect to database

async function getWriteData(){
  // Get list of outlets to search
  const outletList: mediaOutlet[] = await dbClient.connect().then(async response=>{
    var outletCollection = dbClient.db(process.env.DB_NAME as string).collection("outletsList");
    var articleCollection = dbClient.db(process.env.DB_NAME as string).collection("newsData");
    const innerOutletList: mediaOutlet[] = [];
    const outletAggregate = await outletCollection.aggregate([
      {
        '$project': {
          'outletName': 1, 
          'RSSLink': 1
        }
      }
    ]);
    await outletAggregate.forEach((obj)=>{
      innerOutletList.push({"name": obj.outletName as string,
                      "rssLink": obj.RSSLink as string,
                      "articleList": []});
    });
    dbClient.close();
    return innerOutletList
  });
  console.log("DONE")

  // Iterate through each media outlet and get current article data from rss feed
    var aCount: number = 0;
    for(var i:number=0; i<outletList.length; i++){
      try{
        console.log(`${i+1}/${outletList.length}`)
        var thisArticleList = await rssParser.parseURL(outletList[i].rssLink);
        thisArticleList.items.forEach(rs =>{
          aCount += 1;
          var thisScore: number = vaderSentiment.SentimentIntensityAnalyzer.polarity_scores(rs.title)["compound"]; // Generate sentiment score
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
      }catch(Exception){
        console.log(outletList[i])
      }
    };
    console.log(`Total articles counted = ${aCount}`);
    console.log("Beginning to upload articles");

  /*
  And finally, upload the unique articles to MongoDB
  */
  var uploadCount:number = 0; 
  await dbClient.connect().then(async response =>{
  const articleCollection = dbClient.db(process.env.DB_NAME as string).collection("newsData");
  for(var i:number = 0; i<outletList.length; i++){
    for(var k:number = 0; k<outletList[i]["articleList"].length; k++){
      // Get a ny articles that have the same healine and publisher
      var articleObj = await articleCollection.find({
        outletName: { $exists: true, $eq: outletList[i]["name"] },
        headline:{ $exists: true, $eq: outletList[i]["articleList"][k]["headline"]}});
      var articleArray = await articleObj.toArray();
      if (articleArray.length == 0){ // Check to see if any articles exists with the same headline and outlet
        await articleCollection.insertOne(outletList[i]["articleList"][k]); // If article is unique, upload it to the db
        uploadCount += 1
      }
  }
  }
  console.log(`Finished Uploading ${uploadCount} articles, have a great day`)
  });

  // Write date to a runlog file
  var file = await fs.appendFileSync("runlog.txt", `${new Date().toISOString()} articles written to DB = ${uploadCount}, total articles found = ${aCount}\n`, "utf8");
  console.log("Written to file");
  process.exit();

}

getWriteData();