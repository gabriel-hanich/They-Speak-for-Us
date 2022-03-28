import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DateConverterService } from 'src/app/services/date-converter.service';
import { GetDbDataService } from 'src/app/services/get-db-data.service';
import { apiDataResponse, topic } from 'src/model';

@Component({
  selector: 'app-graph-screen',
  templateUrl: './graph-screen.component.html',
  styleUrls: ['./graph-screen.component.scss']
})
export class GraphScreenComponent implements OnInit {
  public category: string;
  public startDate: Date;
  public endDate: Date;
  public finalChartData: ChartConfiguration["data"];
  private earlyChartData: ChartConfiguration["data"] = {"datasets": [], "labels": []};
  public chartConfig: ChartConfiguration["options"];
  public chartType: ChartType = 'line';
  
  private doAdvanced: string;
  private topicList: Array<topic>;
  private topicName: string;

  constructor(private route: ActivatedRoute, private dateService: DateConverterService, private getDBService: GetDbDataService) { 
  }
  
  ngOnInit(): void { // Show graph
    this.finalChartData = {"datasets": [], "labels": []};
    this.route.params.subscribe((params)=>{ 
      this.startDate = this.dateService.stringToDate(params["startDate"]); // Get URL Params
      this.endDate = this.dateService.stringToDate(params["endDate"]);
      this.category = params["category"];
      this.doAdvanced = params["advancedSearch"];
      if(this.doAdvanced == "true"){
        this.topicList = JSON.parse(localStorage.getItem("advanced_settings") as string);
        console.log(this.topicList)
        for(var i:number=0; i<this.topicList.length; i++){
          this.getDBService.getAdvancedGraphData(this.startDate, 
            this.endDate, 
            this.topicList[i]["selectedOutletName"], 
            this.topicList[i]["selectedHeadlineTerms"],
            this.topicList[i]["topicName"]).subscribe((res: Array<apiDataResponse>)=>{
              this.processData(res);
            })
        }
      }else{
        this.getDBService.getBasicGraphData(this.startDate, this.endDate).subscribe((res:  Array<apiDataResponse>)=>{ // Get DB Data for params
          this.processData(res);
        });
      }
    });
  }

  processData(data:  Array<apiDataResponse>):void{ // Process the DB data and display it
    const yData: Array<number> = [];
    const xData: Array<string> = [];
    var topicName: string = "";
    for(var i:number = 0; i<data.length; i++){
      topicName = data[i]["name"]
      if(this.category == "Article Count"){
        yData.push(data[i]["count"]);
      }else if(this.category == "Average Sentiment"){
        yData.push(data[i]["score"]);
      }
      xData.push(this.dateService.dateToString(new Date(data[i]["date"])));
    }

    // Hide loading bar
    document.getElementById("loadWheel")?.classList.add("hidden")
    
    if(this.earlyChartData.datasets.length == 0){
      this.earlyChartData = {
        "datasets": [{
          data: yData,
          label: topicName
        }],
        "labels": xData
      }
    }else{
      this.earlyChartData.datasets.push({
        data: yData,
        label: topicName
      });
    }

    

    if(this.doAdvanced == "true"){
      console.log(this.earlyChartData)
      if(this.topicList.length == this.earlyChartData.datasets.length){
        this.finalChartData = this.earlyChartData;
        console.log(this.finalChartData)
      }
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
    if(this.doAdvanced != "true"){
      this.finalChartData = this.earlyChartData
    }

  }

}
