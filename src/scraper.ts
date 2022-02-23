import Parser from 'rss-parser';
import { MongoClient, ServerApiVersion } from "mongodb";




type CustomFeed = {foo: string};
type CustomItem = {bar: number};

const parser: Parser<CustomFeed, CustomItem> = new Parser();
const dbClient = new MongoClient();

(async () => {
})();