import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MongoClient } from "mongodb";
import { Article, Outlet } from "../@types/outlet";
import Parser from 'rss-parser';
import { RSSReply as RSSItem } from "../@types/rss";

type CustomFeed = {foo: string};

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  // Constants
  const version: string = "0.0.3";
  const dbClient = new MongoClient("mongodb+srv://admin:Money@newsdatadb.fiddv.mongodb.net/?retryWrites=true&w=majority"); // Used to connect to database
  const rssParser: Parser<CustomFeed, RSSItem> = new Parser(); // Used to read the rss feeds of the outlets
  const dbName: string = "test";


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
  
  // For each outlet, get a list of all the articles from the given RSS link
  let articleCount: number = 0;
  for(var outletIndex=0; outletIndex<outletList.length; outletIndex++){
    let outlet = outletList[outletIndex];
    let rss = await fetch(outlet.RSSLink, {
      "method": "GET"
    });
    let rssText: string = await rss.text();
    let outletData = await rssParser.parseString(rssText); // Read the RSS feed from the link
    let articleList: RSSItem[] = outletData.items; // Get the items
    articleList.forEach((item: RSSItem)=>{
      articleCount += 1;
      outlet.articleList.push({ // Append to the outlet's articlelist
        "outletName": outlet.outletName,
        "headline": item.title,
        "description": item.contentSnippet,
        "author": item.creator,
        "publishDate": new Date(item.isoDate as string),
        "isLegacy": false,
        "sentimentScore": 0,
        "linkToArticle": item.link,
        "catergories": item.categories,
      })
    });
    console.log(`${outletIndex + 1}/${outletList.length}`)
  }

  console.log(`Total articles Found: ${articleCount}`);

  // Upload the articles to mongoDB
  let uploadCount: number = 0;
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
        await articleCollection.insertOne(outlet.articleList[articleIndex]);
        uploadCount += 1;
      }
    }
  }
  context.res = {
      // status: 200, /* Defaults to 200 */
      body: {"version": version, "articles": articleCount, "uploaded": uploadCount,"outlets": outletList, }
  };
};

export default httpTrigger;