import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DateConverterService } from './date-converter.service';
import { apiRespone } from 'src/model';
@Injectable({
  providedIn: 'root'
})
export class GetDbDataService {

  constructor(private httpService: HttpClient, private dateService: DateConverterService) { }

  getArticleCount(): Observable<string>{
    return this.httpService.get<string>(environment.backEndURL + "/article_count")
  }

  getAvgSentiment(startDate: Date, endDate: Date): Observable<Array<apiRespone>>{
    if(!startDate.getTime() || !endDate.getTime()){
      var startString = "09.15.2021"
      var endString = this.dateService.dateToString(new Date())
    }else{
      var startString = this.dateService.dateToString(startDate);
      var endString = this.dateService.dateToString(endDate);
    }

    return this.httpService.get<Array<apiRespone>>(environment.backEndURL + "/data/" + startString + "/" + endString)
  }

  getOutletList(): Array<any>{
    return [{outletName: "ABC News"}, {outletName: "9 News"}, {outletName: "The Guardian"}]
  }
}
