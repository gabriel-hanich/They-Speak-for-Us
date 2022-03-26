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

  getBasicGraphData(startDate: Date, endDate: Date): Observable<Array<apiDataResponse>>{
    var startString = this.dateService.dateToString(startDate);
    var endString = this.dateService.dateToString(endDate);
    return this.httpService.get<Array<apiDataResponse>>(environment.backEndURL + "/data/" + startString + "/" + endString)
  }
  
  getAdvancedGraphData(startDate: Date, endDate: Date, outlet: string, headlineList: Array<string>): Observable<Array<apiDataResponse>>{
    var startString = this.dateService.dateToString(startDate);
    var endString = this.dateService.dateToString(endDate);
    return this.httpService.get<Array<apiDataResponse>>(environment.backEndURL + "/data/advanced/" + startString + "/" + endString)
  }

  getOutletList(): Observable<Array<apiOutletResponse>>{
    return this.httpService.get<Array<apiOutletResponse>>(environment.backEndURL + "/outlet_list")
  }
}
