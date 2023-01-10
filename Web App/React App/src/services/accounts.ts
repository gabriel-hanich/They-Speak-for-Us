import { BackendStatus } from "../types";
import { getBackendUrl } from "./constants";

export async function createAccount(email: string, access: string, password: string): Promise<BackendStatus>{
    return new Promise<BackendStatus>(async(resolve, reject)=>{
        let res = await fetch(getBackendUrl() + "/account/create", ({
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({email: email, access: access, password: password})
        })).catch((error)=>{
            resolve({"status": 404, "success": false, "comment": "404 | Could not contact server"})
        });
        let data = await (res as Response).json();
        console.log(data);
        let result: BackendStatus = {"status": data.status, "success": true, "comment": ""};
        if(data.created){
            result["comment"] = data["userPin"];
        }else{
            if(data.status === 203){
                result["success"] = false;
                result["comment"] = "An account with this email already exists"
            }
            else if(data.status === 200){
                result["success"] = false;
                result["comment"] = "The server verified your request but could not create an account"
            }else if(data.status === 401){
                result["success"] = false;
                result["comment"] = "You don't have authorization to make an account. Ensure your access pin is correct"
            }
        }
        
        console.log(result);
        resolve(result);
    });
}

export async function loginAccount(email: string, password: string): Promise<BackendStatus>{
    return new Promise<BackendStatus>(async(resolve, reject)=>{
        const res = await fetch(getBackendUrl() + "/account/login", ({
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({email: email, password: password})
        })).catch((error)=>{
            resolve({"status": 404, "success": false, "comment": "404 | Could not contact server"})
        });
        const data = await (res as Response).json();
        console.log(data);
        let result: BackendStatus = {"status": data.status, "success": true, "comment": ""};
        if(data.success){
            result["comment"] = data["userKey"];
        }else{
            if(data.status === 200){
                result["success"] = false;
                result["comment"] = "The server succesfully validated your request but could not find your userkey"
            }else if(data.status === 403){
                result["success"] = false;
                result["comment"] = "Your username or password is incorrect"
            }
        }
        resolve(result);
    });        
}

export default createAccount;