import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateConverterService {

  constructor() { }

  dateToString(thisDate: Date): string{
    if(thisDate){
      return `${thisDate.getMonth() + 1}.${thisDate.getDate()}.${thisDate.getFullYear()}`
    }else{
      return ""
    }
  }

  stringToDate(thisDateString: string){
    return new Date(thisDateString);
  }
}
