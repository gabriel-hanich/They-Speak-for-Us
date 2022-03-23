import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DateConverterService } from 'src/app/services/date-converter.service';
import { GetDbDataService } from 'src/app/services/get-db-data.service';
import { apiRespone } from 'src/model';

@Component({
  selector: 'app-graph-screen',
  templateUrl: './graph-screen.component.html',
  styleUrls: ['./graph-screen.component.scss']
})
export class GraphScreenComponent implements OnInit {
  public startDate: Date;
  public endDate: Date;

  constructor(private route: ActivatedRoute, private dateService: DateConverterService, private getDBService: GetDbDataService) { 
  }
  
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      console.log(params)
      this.startDate = this.dateService.stringToDate(params["startDate"]);
      this.endDate = this.dateService.stringToDate(params["endDate"]);
      console.log(this.startDate);
      console.log(this.endDate);
      this.getDBService.getAvgSentiment(this.startDate, this.endDate).subscribe((res:  Array<apiRespone>)=>{
        this.processData(res)
      })
    });

  }

  processData(data:  Array<apiRespone>):void{
    console.log(data);
    const yData: Array<any> = [];
    for(var i:number = 0; i<data.length; i++){
      yData.push(data[i]["val"]);
    }
  }

}
