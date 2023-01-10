import { OutletSelection } from "../types";
import { GetOutletList } from "./getData"

export const getBackendUrl = ()=>{
    return "https://ap-southeast-2.aws.data.mongodb-api.com/app/scraper-lyeyd/endpoint"
}

export const getDefaultOutletSelection = ():Promise<OutletSelection[]>=>{
    
    return new Promise<OutletSelection[]>(async (resolve, reject)=>{
        let outletList: string[] = await GetOutletList();
        let result: OutletSelection[] = [{"name": "All Outlets", "selected": true}]
        outletList.forEach((outlet: string)=>{
            result.push({"name": outlet, "selected": false})
        });
        resolve(result)

    })
}