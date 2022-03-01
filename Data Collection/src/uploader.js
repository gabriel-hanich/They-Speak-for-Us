"use strict";
/*
Reads CSV data present in the 'data' folder and uploads to DB
DOES NOT CHECK FOR DUPLICATES
'Modernises' existing data
*/
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
/// <reference path="../@types/vader-sentiment.d.ts" />
const vader_sentiment_1 = __importDefault(require("vader-sentiment"));
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
// Constants
const dataVersion = 3;
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../settings.env') });
const getOutletList = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        var outletList = []; // Array containing all present media outlets
        fs_1.default.createReadStream(path_1.default.resolve(__dirname, `../data/${dataVersion}/Media Outlets.csv`))
            .pipe((0, csv_parser_1.default)())
            .on('data', function (data) {
            outletList.push({ name: data.outletName, rssLink: data.RSSLink, articleList: [] }); // Add each line to the array 
        })
            .on('end', function () {
            resolve(outletList);
        });
    });
});
const getArticles = (outletName) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        var articleList = []; // Array containig each article for specific outlet
        if (fs_1.default.existsSync(path_1.default.resolve(__dirname, `../data/${dataVersion}/csv/${outletName}.csv`))) { // Ensure outlets file exists
            fs_1.default.createReadStream(path_1.default.resolve(__dirname, `../data/${dataVersion}/csv/${outletName}.csv`), "utf-8")
                .pipe((0, csv_parser_1.default)())
                .on('data', function (data) {
                var thisSentimentScore = vader_sentiment_1.default.SentimentIntensityAnalyzer.polarity_scores(data.headline)["compound"]; // Generate sentiment score
                articleList.push({ outletName: outletName,
                    isLegacy: true,
                    headline: data.headline,
                    description: data.description,
                    author: data.author,
                    publishDate: new Date(data.date),
                    sentimentScore: thisSentimentScore });
            })
                .on('end', () => {
                resolve(articleList); // Return array
            });
        }
        else { // If file is not found for specific outlet
            console.log(`File Not Found for outlet ${outletName}`);
            reject(`File Not Found for outlet ${outletName}`);
        }
    });
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const dbClient = new mongodb_1.MongoClient(process.env.DB_URI);
    // Get array containing each tracked outlet
    const outletList = yield getOutletList();
    // Get array with each article for each outlet
    for (var i = 0; i < outletList.length; i++) {
        outletList[i]["articleList"] = yield getArticles(outletList[i]["name"]);
        console.log(`${i + 1}/${outletList.length}`); // Used as a loading 'bar' to show read progress
    }
    // Upload data to db
    console.log("CONNECTING TO DATABASE");
    var articleCount = 0; // Track how many articles are uploaded
    yield dbClient.connect().then((respone) => __awaiter(void 0, void 0, void 0, function* () {
        const articleCollection = dbClient.db(process.env.DB_NAME).collection("newsData");
        const outletCollection = dbClient.db(process.env.DB_NAME).collection("outletsList");
        for (var i = 0; i < outletList.length; i++) {
            console.log(`Starting ${i + 1} of ${outletList.length}`);
            yield outletCollection.insertOne({ "outletName": outletList[i]["name"], "rssLink": outletList[i]["rssLink"] });
            for (var aI = 0; aI < outletList[i]["articleList"].length; aI++) {
                var a = yield articleCollection.insertOne(outletList[i]["articleList"][aI]); // Upload article
                articleCount += 1;
            }
        }
        console.log(`Uploaded ${articleCount} articles`);
    }));
    console.log("FINISHED UPLOADING");
    process.exit();
}))();
