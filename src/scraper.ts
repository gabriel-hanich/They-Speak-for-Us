import Parser from 'rss-parser';
import { MongoClient, ServerApiVersion } from "mongodb";
import path, { resolve } from 'path';
import dotenv from "dotenv";

// Local interfaces
import { article, mediaOutlet } from "../@types/media";

dotenv.config({ path: path.resolve(__dirname, "../.env")});

type CustomFeed = {foo: string};
type CustomItem = {bar: number};

const rssParser: Parser<CustomFeed, CustomItem> = new Parser();
const dbClient = new MongoClient(process.env.DB_URI as string);

(async () => {
    // Get list off outlets to search
    const outletList: mediaOutlet[] = await dbClient.connect().then(async response=>{
      var outletCollection = dbClient.db(process.env.DB_NAME as string).collection("outletsList");
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
                          "articleList": []});
        });
        dbClient.close();
        return innerOutletList
      });
    console.log("DONE")
    
    // Iterate through each media outlet and get article data
    var aCount: number = 0;
    for(var i:number=0; i<outletList.length; i++){
      console.log(outletList[i].name)
      var thisArticleList = await rssParser.parseURL(outletList[i].rssLink);
      thisArticleList.items.forEach(rs =>{
        aCount += 1
      });
      //console.log(thisArticleList)
    }
    console.log(`Total articles counted = ${aCount}`)
})();
