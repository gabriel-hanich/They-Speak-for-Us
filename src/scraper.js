"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/// <reference path="../@types/vader-sentiment.d.ts" />
var vaderSentiment = require("vader-sentiment");
var Parser = require("rss-parser");
var mongodb_1 = require("mongodb");
var path = require("path");
var dotenv = require("dotenv");
var fs = require("fs");
dotenv.config({ path: path.resolve(__dirname, "../.env") });
var rssParser = new Parser(); // Used to get rss feed data
var dbClient = new mongodb_1.MongoClient(process.env.DB_URI); // Used to connect to database
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var outletList, aCount, i, thisArticleList, uploadCount, file;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dbClient.connect().then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                    var outletCollection, articleCollection, innerOutletList, outletAggregate;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                outletCollection = dbClient.db(process.env.DB_NAME).collection("outletsList");
                                articleCollection = dbClient.db(process.env.DB_NAME).collection("newsData");
                                innerOutletList = [];
                                return [4 /*yield*/, outletCollection.aggregate([
                                        {
                                            '$project': {
                                                'outletName': 1,
                                                'RSSLink': 1
                                            }
                                        }
                                    ])];
                            case 1:
                                outletAggregate = _a.sent();
                                return [4 /*yield*/, outletAggregate.forEach(function (obj) {
                                        innerOutletList.push({ "name": obj.outletName,
                                            "rssLink": obj.RSSLink,
                                            "articleList": [] });
                                    })];
                            case 2:
                                _a.sent();
                                dbClient.close();
                                return [2 /*return*/, innerOutletList];
                        }
                    });
                }); })];
            case 1:
                outletList = _a.sent();
                console.log("DONE");
                aCount = 0;
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < outletList.length)) return [3 /*break*/, 5];
                console.log("".concat(i + 1, "/").concat(outletList.length));
                return [4 /*yield*/, rssParser.parseURL(outletList[i].rssLink)];
            case 3:
                thisArticleList = _a.sent();
                thisArticleList.items.forEach(function (rs) {
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
                        "catergories": rs.categories
                    });
                });
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5:
                ;
                console.log("Total articles counted = ".concat(aCount));
                console.log("Beginning to upload articles");
                uploadCount = 0;
                return [4 /*yield*/, dbClient.connect().then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                        var articleCollection, i, k, articleObj, articleArray;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    articleCollection = dbClient.db(process.env.DB_NAME).collection("newsData");
                                    i = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(i < outletList.length)) return [3 /*break*/, 8];
                                    k = 0;
                                    _a.label = 2;
                                case 2:
                                    if (!(k < outletList[i]["articleList"].length)) return [3 /*break*/, 7];
                                    return [4 /*yield*/, articleCollection.find({ outletName: { $exists: true, $eq: outletList[i]["name"] }, headline: { $exists: true, $eq: outletList[i]["articleList"][k]["headline"] } })];
                                case 3:
                                    articleObj = _a.sent();
                                    return [4 /*yield*/, articleObj.toArray()];
                                case 4:
                                    articleArray = _a.sent();
                                    if (!(articleArray.length == 0)) return [3 /*break*/, 6];
                                    return [4 /*yield*/, articleCollection.insertOne(outletList[i]["articleList"][k])];
                                case 5:
                                    _a.sent(); // If article is unique, upload it to the db
                                    uploadCount += 1;
                                    _a.label = 6;
                                case 6:
                                    k++;
                                    return [3 /*break*/, 2];
                                case 7:
                                    i++;
                                    return [3 /*break*/, 1];
                                case 8:
                                    console.log("Finished Uploading ".concat(uploadCount, " articles, have a great day"));
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 6:
                _a.sent();
                return [4 /*yield*/, fs.appendFileSync("runlog.txt", "".concat(new Date().toISOString(), " articles written to DB = ").concat(uploadCount, ", total articles found = ").concat(aCount, "\n"), "utf8")];
            case 7:
                file = _a.sent();
                console.log("Written to file");
                return [2 /*return*/];
        }
    });
}); })();
