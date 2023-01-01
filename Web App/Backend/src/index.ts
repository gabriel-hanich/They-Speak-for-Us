const express = require("express");
const cors = require("cors");


const app = express();
const port: number = 2000;

app.use(cors());
app.use(express.json())

app.get("/", (req: any, res: any)=>{
    res.send("Hello world")
});

app.post("/account/test", (req: any, res: any)=>{
    let result = {"status": 200, "uniqueEmail": true}
    if(req.body.email === "spam@gmail.com"){
        result["uniqueEmail"] = false;
    }
    res.json(result);
});

app.post("/account/create", (req: any, res: any)=>{
    let result = {"status": 200, "created": true, "userKey": "ABCDEF"}
    console.log(req.body);
    if(req.body.email !== "gabriel.hanich1@gmail.com"){
        result["created"] = false;
        res["status"] = 203;
    }
    if(req.body.access !== "ABCD"){
        result["created"] = false;
        result["status"] = 401;
    }
    res.json(result);
});

app.post("/account/login", (req: any, res: any)=>{
    let result: any = {"status": 200, "valid": true, "userKey": "ABCDEF"}
    console.log(req.body);
    if(req.body.email !== "gabriel.hanich1@gmail.com"){
        result["valid"] = false;
        result["status"] = 403;
    }
    if(req.body.password !== "hi"){
        result["valid"] = false;
        result["status"] = 403;
    }
    res.json(result);
})

app.listen(port, ()=>{
    console.log("App is listening on port " + port);
})