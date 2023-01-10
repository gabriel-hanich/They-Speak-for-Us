import { OutletQuery, Point, Topic } from "../types";
import { getBackendUrl } from "./constants";

export async function GetOutletList(): Promise<string[]>{
    return new Promise<string[]>(async(resolve, reject)=>{
        let elemList = await fetch(getBackendUrl() + "/outlets", {
            "method": "GET"
        });
        let outletsList =  JSON.parse(await elemList.text());
        resolve(outletsList.map((dict: any) => dict["outletName"]));
    });
}

export async function GetDataPoints(query: OutletQuery, pin: string): Promise<Array<{name: string, data: Point[]}>> {
    return new Promise<Array<{name: string, data: Point[]}>>(async(resolve, reject)=>{
        // Generate request
        let request = {
            "pin": pin,
            "startDate": query["startDate"].toISOString(),
            "endDate": query["endDate"].toISOString(),
            "plotType": "count",
            "seriesList": [{}]
        };
        query.topicList.forEach((topic: Topic) => {
            let outlets: string[] = [];
            topic["outletList"].forEach((selection)=>{
                if(selection["selected"]){
                    if(selection["name"] === "All Outlets"){
                        outlets = ["all"];
                        return
                    }else if(outlets[0] !== "all"){
                        outlets.push(selection["name"]);
                    }
                }
            });
            request["seriesList"].push({
                "name": topic["title"],
                "keywordList": topic["keywords"],
                "outlet": outlets
            })
        });
        request["seriesList"].splice(0, 1);
        let serverResponse = await fetch(getBackendUrl() + "/getdata", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(request)
        }).catch((error)=>{
            console.error("COULD NOT CONTACT THE SERVER");
        });
        let data: any = await (serverResponse as Response).text();
        data = JSON.parse(data);
        data = data["data"];
        
        let res: {name: string, data: Point[]}[] = [];
        let topicNames: string[] = Object.keys(data);
        topicNames.forEach((topicName: string)=>{
            let coords: Point[] = [];
            let xVals = Object.keys(data[topicName]);
            xVals.forEach((val: string)=>{
                coords.push({"x": new Date(val), y: data[topicName][val]})
            })
            res.push({
                "name": topicName,
                "data": coords
            });
        });
        resolve(res);
    });
}

export async function getArticleCount(): Promise<{"articles": number, "outlets": number}>{
    return new Promise<{"articles": number, "outlets": number}>(async (resolve, reject)=>{
        let serverData = await fetch(getBackendUrl() + "/articleCount");
        resolve(JSON.parse(await serverData.text()));
    });
}

export function VerifyEmail(email: string){ // Verify that a given email is valid
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
}