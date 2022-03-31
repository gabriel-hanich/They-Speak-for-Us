"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
Reads RSS Data for each outlet present in the data base,
then uploads unique outlet to the DB
*/
/// <reference path="../@types/vader-sentiment.d.ts" />
const vaderSentiment = __importStar(require("vader-sentiment"));
const rss_parser_1 = __importDefault(require("rss-parser"));
const cron_1 = __importDefault(require("cron"));
const mongodb_1 = require("mongodb");
const path = __importStar(require("path"));
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("fs"));
dotenv.config({ path: path.resolve(__dirname, "../settings.env") });
const rssParser = new rss_parser_1.default(); // Used to get rss feed data
const dbClient = new mongodb_1.MongoClient(process.env.DB_URI); // Used to connect to database
function getWriteData() {
    return __awaiter(this, void 0, void 0, function* () {
        // Get list of outlets to search
        const outletList = yield dbClient.connect().then((response) => __awaiter(this, void 0, void 0, function* () {
            var outletCollection = dbClient.db(process.env.DB_NAME).collection("outletsList");
            var articleCollection = dbClient.db(process.env.DB_NAME).collection("newsData");
            const innerOutletList = [];
            const outletAggregate = yield outletCollection.aggregate([
                {
                    '$project': {
                        'outletName': 1,
                        'RSSLink': 1
                    }
                }
            ]);
            yield outletAggregate.forEach((obj) => {
                innerOutletList.push({ "name": obj.outletName,
                    "rssLink": obj.RSSLink,
                    "articleList": [] });
            });
            dbClient.close();
            return innerOutletList;
        }));
        console.log("DONE");
        // Iterate through each media outlet and get current article data from rss feed
        var aCount = 0;
        for (var i = 0; i < outletList.length; i++) {
            console.log(`${i + 1}/${outletList.length}`);
            var thisArticleList = yield rssParser.parseURL(outletList[i].rssLink);
            thisArticleList.items.forEach(rs => {
                aCount += 1;
                var thisScore = vaderSentiment.SentimentIntensityAnalyzer.polarity_scores(rs.title)["compound"]; // Generate sentiment score
                outletList[i]["articleList"].push({
                    "outletName": outletList[i]["name"],
                    "headline": rs.title,
                    "description": rs.contentSnippet,
                    "author": rs.creator,
                    "publishDate": new Date(rs.isoDate),
                    "isLegacy": false,
                    "sentimentScore": thisScore,
                    "linkToArticle": rs.link,
                    "catergories": rs.categories,
                });
            });
        }
        ;
        console.log(`Total articles counted = ${aCount}`);
        console.log("Beginning to upload articles");
        /*
        And finally, upload the unique articles to MongoDB
        */
        var uploadCount = 0;
        yield dbClient.connect().then((response) => __awaiter(this, void 0, void 0, function* () {
            const articleCollection = dbClient.db(process.env.DB_NAME).collection("newsData");
            for (var i = 0; i < outletList.length; i++) {
                for (var k = 0; k < outletList[i]["articleList"].length; k++) {
                    // Get a ny articles that have the same healine and publisher
                    var articleObj = yield articleCollection.find({
                        outletName: { $exists: true, $eq: outletList[i]["name"] },
                        headline: { $exists: true, $eq: outletList[i]["articleList"][k]["headline"] }
                    });
                    var articleArray = yield articleObj.toArray();
                    if (articleArray.length == 0) { // Check to see if any articles exists with the same headline and outlet
                        yield articleCollection.insertOne(outletList[i]["articleList"][k]); // If article is unique, upload it to the db
                        uploadCount += 1;
                    }
                }
            }
            console.log(`Finished Uploading ${uploadCount} articles, have a great day`);
        }));
        // Write date to a runlog file
        var file = yield fs.appendFileSync("runlog.txt", `${new Date().toISOString()} articles written to DB = ${uploadCount}, total articles found = ${aCount}\n`, "utf8");
        console.log("Written to file");
    });
}
// Get code to r
var job = new cron_1.default.CronJob('0 6,18 * * *', function () {
    console.log("STARTING RUNNING");
    getWriteData();
}, null, true, 'Australia/Sydney');
console.log("CRONJOB INIT DONE");
job.start();
