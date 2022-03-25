import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Observable } from 'rxjs';
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

  getGraphData(startDate: Date, endDate: Date): Observable<Array<apiDataResponse>>{
    if(!startDate.getTime() || !endDate.getTime()){
      var startString = "09.15.2021"
      var endString = this.dateService.dateToString(new Date())
    }else{
      var startString = this.dateService.dateToString(startDate);
      var endString = this.dateService.dateToString(endDate);
    }

    return this.httpService.get<Array<apiDataResponse>>(environment.backEndURL + "/data/" + startString + "/" + endString)
  }

  getOutletList(): Observable<Array<apiOutletResponse>>{
    return this.httpService.get<Array<apiOutletResponse>>(environment.backEndURL + "/outlet_list")
  }
}
