import { BackendStatus } from "../types";
import { getBackendUrl } from "./constants";

async function testEmail(email: string): Promise<BackendStatus> {
    return new Promise<BackendStatus>(async (resolve, reject)=>{
        let res = await fetch(getBackendUrl() + "/account/test", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({email: email})
        });
        let data: any = await res.json()
        let response: BackendStatus = {"status": 200, "success": true, "comment": ""};

        if(data["status"] === 200){
            if(!(data["uniqueEmail"] ) as boolean){
                response["success"] = false;
                response["comment"] = "This Email is already registered with us";
            }
        }else{
            response["status"] = 404;
            response["success"] = false;
            response["comment"] = "No contact could be made with the server"
        }
        resolve(response);
    });

}

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
            result["comment"] = data["userKey"];
        }else{
            if(data.status === 200){
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
        let result: BackendStatus = {"status": data.status, "success": true, "comment": ""};
        if(data.valid){
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

export default testEmail;