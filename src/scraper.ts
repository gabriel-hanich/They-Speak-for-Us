/// <reference path="../@types/vader-sentiment.d.ts" />
import vaderSentiment from "vader-sentiment";
import csvParser from "csv-parser";
import path from "path";
import Express from "express";
import dotenv from "dotenv";
import ejs from "ejs";
import { MongoClient, ServerApiVersion } from "mongodb";


dotenv.config({path: path.resolve(__dirname, '../.env')});


const uri: string = process.env.DB_URI as string;
const client  = new MongoClient(uri);

// Get list of media outlets to read
async function getMediaOutlets(uri:string){
  client.connect(err =>{
      const thisDB = client.db("test").collection("testData");
      var myObj: object = { headline: "This is a test headline", author: "Me"}
      thisDB.insertOne(myObj, ()=>{
          client.close()
          console.log("FINISHED")
      })
  })
}