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

  public getMediaData(options: GraphOptions) :Observable<any>{
    console.log(options);
    // Prep packet before being sent
    let sendPackage: any = {
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

    console.log(sendPackage);
    return this.httpClient.post(environment.url, sendPackage, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    })
  }
}
