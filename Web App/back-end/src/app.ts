const express = require('express');
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const { MongoClient } = require('mongodb');

dotenv.config({ path: path.resolve(__dirname, "../settings.env")});

const app = express();
const port = 3000;
const dbClient = new MongoClient(process.env.DB_URI)

app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


app.get('/article_count', async (req,res) => {
    // Calculate how many articles there are in the DB
    await dbClient.connect()
    var thisCollection = dbClient.db(process.env.DB_NAME).collection("newsData");
    var dbData = await thisCollection.count();
    res.send(dbData.toString())
    dbClient.close()
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});