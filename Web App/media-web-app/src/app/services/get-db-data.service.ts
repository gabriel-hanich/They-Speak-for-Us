import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DateConverterService } from './date-converter.service';
import { apiDataResponse, apiOutletResponse } from 'src/model';
@Injectable({
  providedIn: 'root'
})
export class GetDbDataService {

  constructor(private httpService: HttpClient, private dateService: DateConverterService) { }

  getArticleCount(): Observable<string>{
    return this.httpService.get<string>(environment.backEndURL + "/article_count")
  }

  getBasicGraphData(startDate: Date, endDate: Date): Observable<Array<apiDataResponse>>{
    var startString = this.dateService.dateToString(startDate);
    var endString = this.dateService.dateToString(endDate);
    return this.httpService.get<Array<apiDataResponse>>(environment.backEndURL + "/data/" + startString + "/" + endString)
  }
  
  getAdvancedGraphData(startDate: Date, endDate: Date, outlet: string, headlineList: Array<string>, name: string): Observable<Array<apiDataResponse>>{
    var startString = this.dateService.dateToString(startDate);
    var endString = this.dateService.dateToString(endDate);
    var headlineString: string = "";
    if(headlineList.length == 0){
      headlineString = "$none"
    }else{
      for(var i:number=0; i<headlineList.length; i++){
        headlineString += headlineList[i] + ","
      }
    }
    console.log(environment.backEndURL + "/data/advanced/" + startString + "/" + endString + "/" + outlet + "/" + headlineString + "/" + name)
    return this.httpService.get<Array<apiDataResponse>>(environment.backEndURL + "/data/advanced/" + startString + "/" + endString + "/" + outlet + "/" + headlineString+ "/" + name)
  }

  getOutletList(): Observable<Array<apiOutletResponse>>{
    return this.httpService.get<Array<apiOutletResponse>>(environment.backEndURL + "/outlet_list")
  }
}
