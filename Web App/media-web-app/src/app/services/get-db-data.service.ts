import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetDbDataService {

  constructor(private httpService: HttpClient) { }

  getArticleCount(): Observable<string>{
    return this.httpService.get<string>("http://localhost:3000/article_count")
  }

  getOutletList(): Array<any>{
    return [{outletName: "ABC News"}, {outletName: "9 News"}, {outletName: "The Guardian"}]
  }
}
