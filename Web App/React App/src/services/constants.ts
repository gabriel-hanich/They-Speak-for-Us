import { OutletSelection } from "../types";
import { GetOutletList } from "./getData"

export const getBackendUrl = ()=>{
    return "http://localhost:2000"
}

export const getDefaultOutletSelection = ()=>{
    let outletList: string[] = GetOutletList();
    let result: OutletSelection[] = [{"name": "All Outlets", "selected": true}]
    outletList.forEach((outlet: string)=>{
        result.push({"name": outlet, "selected": false})
    });
    return result;
}