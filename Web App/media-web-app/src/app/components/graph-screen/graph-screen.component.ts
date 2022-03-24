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
  public category: string;
  public startDate: Date;
  public endDate: Date;
  public chartData: ChartConfiguration["data"];
  public chartConfig: ChartConfiguration["options"];
  public chartType: ChartType = 'line';

  constructor(private route: ActivatedRoute, private dateService: DateConverterService, private getDBService: GetDbDataService) { 
  }
  
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      console.log(params)
      this.startDate = this.dateService.stringToDate(params["startDate"]);
      this.endDate = this.dateService.stringToDate(params["endDate"]);
      this.category = params["category"]
      this.getDBService.getAvgSentiment(this.startDate, this.endDate).subscribe((res:  Array<apiRespone>)=>{
        this.processData(res)
      })
    });

  }

  processData(data:  Array<apiRespone>):void{
    console.log(data);
    const yData: Array<number> = [];
    const xData: Array<string> = [];
    for(var i:number = 0; i<data.length; i++){
      if(this.category == "Article Count"){
        yData.push(data[i]["count"]);
      }else if(this.category == "Average Sentiment"){
        yData.push(data[i]["score"]);
      }
      xData.push(this.dateService.dateToString(new Date(data[i]["date"])));
    }
    this.chartData = {
      datasets: [ {
        data: yData,
        label: 'Average Sentiment',
        borderColor: '#4361ee',
        pointBackgroundColor: '#4361ee',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#4361ee'
      }],
      labels: xData
    }
    if(this.category == "Average Sentiment"){
      this.chartConfig = {
        elements: {
          line: {
            tension: 0
          }
        },
        scales: {
          x: {},
          'y-axis-0':
            {
              position: 'left',
              min: -1,
              max: 1
            }
        }
      };
    }else{
      this.chartConfig = {
        elements: {
          line: {
            tension: 0
          }
        },
        scales: {
          x: {},
          'y-axis-0':
            {
              position: 'left',
              min: 0,
            }
        }
      };
    }

  }

}
