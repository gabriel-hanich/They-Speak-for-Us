import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorServiceService {

  constructor() { }

  interpolateColor(color1: Array<number>, color2: Array<number>, factor: number): Array<number>{
    var result: Array<number> = [];
    for(var i:number = 0; i<3; i++){
      result.push(Math.round((color1[i] - color2[i]) * Math.abs(factor) + color2[i]));
    }
    return result
  }

  getSentimentColor(val: number): string{
    var startColor = [0, 0, 0]
    var endColor = [255, 255, 255]
    if(val > 0){ // If score is negative
      startColor = [0, 255 , 0]
    }else{
      startColor = [255, 0, 0]
    }
    var result = this.interpolateColor(startColor, endColor, val)
    return "rgb(" + result[0]+ "," + result[1] + "," + result[2] + ")"
  }
  
  getCountColor(val: number): string{
    var result = this.interpolateColor([255, 255, 255], [0, 0, 0], val);
    return "rgb(" + result[0]+ "," + result[1] + "," + result[2] + ")"

  }
}
