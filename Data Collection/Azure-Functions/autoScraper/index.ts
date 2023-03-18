import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MongoClient } from "mongodb";
import { Article, Outlet } from "../@types/outlet";
import Parser from 'rss-parser';
import { RSSReply as RSSItem } from "../@types/rss";
import vaderSentiment from "vader-sentiment";

type CustomFeed = {foo: string};

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  // Constants
  const version: string = "0.0.11";
  const dbClient = new MongoClient("mongodb+srv://admin:Money@newsdatadb.fiddv.mongodb.net/?retryWrites=true&w=majority"); // Used to connect to database
  const rssParser: Parser<CustomFeed, RSSItem> = new Parser(); // Used to read the rss feeds of the outlets
  const dbName: string = "News-Data";


  await dbClient.connect();

  // Get list of outlets
  let outletCollection = dbClient.db(dbName).collection("outletsList");
  const outletPipeline = await outletCollection.aggregate([
      {
        '$project': {
          'outletName': 1, 
          'RSSLink': 1
        }
      }
  ]);
  let outletList: Outlet[] = [];
  await outletPipeline.forEach((outlet: Outlet)=>{
    outletList.push({...outlet, "articleList": []});
  });

  // Read which outlet needs to be scraped
  let runCountCollection = await dbClient.db(dbName).collection("backend-data").find();
  let runCountDoc = await runCountCollection.toArray();
  let runCount: number = runCountDoc[0]["runCount"];
  const scrapeIndex = runCount % (outletList.length)

  // Increment the runcount by 1
  await dbClient.db(dbName).collection("backend-data").updateOne(
    { runCount: runCount },
    {
      $set: { runCount: runCount + 1}
    }
  );

  outletList = [outletList[scrapeIndex]]

  // For each outlet, get a list of all the articles from the given RSS link
  let articleCount: number = 0;
  for(var outletIndex=0; outletIndex<outletList.length; outletIndex++){
    let outlet = outletList[outletIndex];
    try{
        let outletData = await rssParser.parseURL(outlet.RSSLink); // Read the RSS feed from the link
        let articleList: RSSItem[] = outletData.items; // Get the items
        articleList.forEach((item: RSSItem)=>{
          articleCount += 1;
          let articleScore: number = vaderSentiment.SentimentIntensityAnalyzer.polarity_scores(item.title)["compound"];
          outlet.articleList.push({ // Append to the outlet's articlelist
            "outletName": outlet.outletName,
            "headline": item.title,
            "description": item.contentSnippet,
            "author": item.creator,
            "publishDate": new Date(item.isoDate as string),
            "isLegacy": false,
            "sentimentScore": articleScore,
            "linkToArticle": item.link,
            "catergories": item.categories,
          })
        });
    }catch(Exception){
        console.log("ERROR FOR " + outlet.outletName);
    }

    console.log(`${outletIndex + 1}/${outletList.length}`)
  }

  console.log(`Total articles Found: ${articleCount}`);
  let uploadList: Article[] = [];
  let articleCollection = dbClient.db(dbName).collection("newsData");
    for(var outletIndex=0; outletIndex<outletList.length; outletIndex++){
        let outlet: Outlet = outletList[outletIndex];
        for(var articleIndex=0; articleIndex<outlet.articleList.length; articleIndex++){
            // Get any potential articles that have the same headline and publisher
            let articleSearch = await articleCollection.find({
                outletName: { $exists: true, $eq: outlet.outletName },
                headline:{ $exists: true, $eq: outlet.articleList[articleIndex].headline
            }}).toArray();
            if(articleSearch.length === 0){
                uploadList.push(outlet.articleList[articleIndex])
            }
        }
    }
  if(uploadList.length != 0){
    await articleCollection.insertMany(uploadList)
  }

  context.res = {
      // status: 200, /* Defaults to 200 */
      body: {"version": version, "runCount": runCount, "articleCount": articleCount, "upload": uploadList.length, outlet: outletList[0].outletName}
  };

};


export default httpTrigger;