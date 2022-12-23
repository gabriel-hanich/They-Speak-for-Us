import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GraphOptions, Series } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private httpClient: HttpClient) { }

  public getMediaData(options: GraphOptions, userCredentials: any) :Observable<any>{
    // Prep packet before being sent
    let sendPackage: any = {
      "username": userCredentials["username"],
      "pin": userCredentials["pin"],
      "startDate": options["startDate"].toISOString(),
      "endDate": options["endDate"].toISOString(),
      "plotType": options.plotType,
      "seriesList": []
    }
    options.seriesList.forEach((series: Series)=>{
      sendPackage["seriesList"].push({
        "name": series["name"],
        "keywordList": series["keywordList"],
        "outlet": series["outlet"]
      });
    })

    return this.httpClient.post(environment.url + "/getdata", sendPackage, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    })
  }

  public getDBStats(): Observable<any>{
    return this.httpClient.get(environment.url + "/articleCount");
  }

  public async getOutlets(): Promise<String[]>{
    return new Promise<String[]>((resolve, reject)=>{
      this.httpClient.get(environment.url + "/outlets").subscribe((res: any)=>{
        let returnData: String[] = [];
        res.forEach((outlet: any)=>{
          returnData.push((outlet["outletName"]));
        });
        resolve(returnData);
      });
    });
  }

  public verifyUser(userName: string, pin: string): Observable<boolean>{
    return this.httpClient.post<boolean>(environment.url + "/verify", {"username": userName, "pin": pin});
  }
}
