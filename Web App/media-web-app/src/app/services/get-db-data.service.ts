import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetDbDataService {

  constructor() { }

  getArticleCount(): number{
    return 80000
  }
}
