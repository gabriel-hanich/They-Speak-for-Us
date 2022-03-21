import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GetDbDataService {

  constructor(private httpService: HttpClient) { }

  getArticleCount(): Observable<string>{
    return this.httpService.get<string>(environment.backEndURL + "/article_count")
  }

  getOutletList(): Array<any>{
    return [{outletName: "ABC News"}, {outletName: "9 News"}, {outletName: "The Guardian"}]
  }
}
