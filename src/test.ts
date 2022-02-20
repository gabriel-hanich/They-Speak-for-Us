import Express from "express";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config({path: path.resolve(__dirname, '../.env')});


const uri: string = process.env.DB_URI as string;
const client  = new MongoClient(uri);

client.connect(err =>{
    const thisDB = client.db("test").collection("testData");
    var myObj: object = { headline: "This is a test headline", author: "Me"}
    thisDB.insertOne(myObj, ()=>{
        client.close()
        console.log("FINISHED")
    })

})