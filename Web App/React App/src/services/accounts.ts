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

export async function createAccount(email: string, password: string): Promise<BackendStatus>{
    return new Promise<BackendStatus>(async(resolve, reject)=>{
        let res = await fetch(getBackendUrl() + "/account/create", ({
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({email: email, password: password})
        }));
        let data = await res.json();
        let result: BackendStatus = {"status": 200, "success": true, "comment": ""}
        if(data.created && data.status === 200){
            result["comment"] = data["userKey"];
        }
        if(!data.created){
            result["success"] = false;
            result["comment"] = "The server could not create your account"
        }
        if(data.status !== 200){
            result["status"] = data.status;
            result["comment"] = "Internal Server Error"
        }
        resolve(result);
    });
}


export default testEmail;