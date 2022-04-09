import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ColorServiceService } from 'src/app/services/color-service.service';
import { DateConverterService } from 'src/app/services/date-converter.service';
import { GetDbDataService } from 'src/app/services/get-db-data.service';
import { apiDataResponse, barRowData, topic, topicData, topicTextData } from 'src/model';

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
  public textDataArray: Array<topicTextData> = []
  public barData: Array<barRowData>;
  public mutiplierValue: number| null;
  public minBarVal: number = -1;
  public maxBarVal: number = 1;

  private doAdvanced: string;
  private topicList: Array<topic>;
  private dataArray: Array<topicData> = [];
  private highestBarCount: number = 0;
  private initRendered = false;

  constructor(private route: ActivatedRoute, 
    private dateService: DateConverterService, 
    private getDBService: GetDbDataService,
    private colorGenerator: ColorServiceService) { 
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
    var sentimentData: Array<number> = [];
    var countData: Array<number> = []

    var yData: Array<number> = [];
    var xData: Array<string> = [];
    var topicName: string = "";
    for(var i:number = 0; i<data.length; i++){
      topicName = data[i]["name"]
      sentimentData.push(data[i]["score"]);
      countData.push(data[i]["count"]);
      xData.push(this.dateService.dateToString(new Date(data[i]["date"])));
    }
    if(this.category == "Article Count"){
      yData = countData;
    }else{
      yData = sentimentData
    }
    this.dataArray.push({"name": data[0]["name"], "dates": xData,  "counts": countData, "scores": sentimentData})

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
      if(this.topicList.length == this.earlyChartData.datasets.length){ // If this the final topic to be rendered
        this.displayData()
      }
    } else{
      this.displayData()
    }
  }

  displayData():void{ // Display main graph data AND get text results 
    this.loadTextStats(); // Load the text stats
    this.displayBar(); // Load the bar chart
    this.renderBoxColors();
    document.getElementById("loadWheel")?.classList.add("hidden"); 
    this.finalChartData = this.earlyChartData
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

  loadTextStats():void{
    for(var i:number=0; i<this.dataArray.length; i++){
      // Calculate average sentiment
      var objCount = this.dataArray[i]["scores"].length;
      var avgSentiment = 0;
      var avgCount = 0;

      var highestCount: number = Math.max.apply(null, this.dataArray[i]["counts"]);
      var highestCountDay: string = this.dataArray[i]["dates"][this.dataArray[i]["counts"].indexOf(highestCount)];
      var lowestCount: number = Math.min.apply(null, this.dataArray[i]["counts"]);
      var lowestCountDay: string = this.dataArray[i]["dates"][this.dataArray[i]["counts"].indexOf(lowestCount)];;

      var highestScore: number = Math.max.apply(null, this.dataArray[i]["scores"]);
      var highestScoreDay: string = this.dataArray[i]["dates"][this.dataArray[i]["scores"].indexOf(highestScore)];
      var lowestScore: number = Math.min.apply(null, this.dataArray[i]["scores"]);
      var lowestScoreDay: string = this.dataArray[i]["dates"][this.dataArray[i]["scores"].indexOf(lowestScore)];;
      for(var k:number =0; k<objCount; k++){
        avgSentiment += this.dataArray[i]["scores"][k];
        avgCount += this.dataArray[i]["counts"][k];
      }
      avgSentiment = avgSentiment / objCount;
      avgCount = avgCount / objCount;

      this.textDataArray.push({
        "name": this.dataArray[i]["name"], 
        "avgSentiment": avgSentiment.toFixed(2),
        "avgCount": avgCount.toFixed(2),
        "maxCount": highestCount,
        "maxCountDay": highestCountDay,
        "minCount": lowestCount,
        "minCountDay": lowestCountDay,
        "maxScore": highestScore.toFixed(2),
        "maxScoreDay": highestScoreDay,
        "minScore": lowestScore.toFixed(2),
        "minScoreDay": lowestScoreDay})
    }
  }

  displayBar():void{
    document.getElementById("barContainer")?.classList.remove("hidden");
    this.barData = [];
    if(this.doAdvanced == "true"){
      for(var i=0; i<this.dataArray.length; i++){
        if(this.category == "Article Count"){
          this.barData.push({"title": this.dataArray[i]["name"], "dateList": this.dataArray[i]["dates"], "valList": this.dataArray[i]["counts"]});
        }else{
          this.barData.push({"title": this.dataArray[i]["name"], "dateList": this.dataArray[i]["dates"], "valList": this.dataArray[i]["scores"]});
        }
      }
    }else{ // Get sentiment/count data for every outlet
      // Get list of media outlets
      this.getDBService.getOutletList().subscribe((res)=>{
        for(var i:number = 0; i<res.length; i++){
          // Get daily data for this outlet
          this.getDBService.getAdvancedGraphData(this.startDate, this.endDate, res[i]["outletName"], [], res[i]["outletName"]).subscribe((outletRes)=>{
            var dataList: Array<number> = [];
            for(var k:number=0; k<outletRes.length; k++){
              if(this.category == "Article Count"){
                dataList.push(outletRes[k]["count"])
                if(outletRes[k]["count"] > this.highestBarCount){
                  this.highestBarCount = outletRes[k]["count"];
                }
              }else{
                dataList.push(outletRes[k]["score"])
              }
            }
            this.barData.push({"title": outletRes[0]["name"], "dateList": this.dataArray[0]["dates"], "valList": dataList});
          });
        }
      });
    }

  }

  round(num: number) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
  }

  renderBoxColors():void{
    var elemList = document.getElementsByClassName("Databox");
    for(var i:number=0; i<elemList.length; i++){
      if(this.category == "Average Sentiment"){
        document.getElementById("barGradient")?.classList.add("greenRedScale")
        if(typeof this.mutiplierValue != undefined){
          this.minBarVal = -this.round((1 / (this.mutiplierValue as number)));
          this.maxBarVal = this.round(1 / (this.mutiplierValue as number));
          (elemList[i] as HTMLElement).style.backgroundColor = this.getSentimentBGColor((elemList[i] as HTMLElement).id, this.mutiplierValue as number);
        }else{
          this.minBarVal = -1;
          this.maxBarVal = 1;
          (elemList[i] as HTMLElement).style.backgroundColor = this.getSentimentBGColor((elemList[i] as HTMLElement).id, 1);
        }
      }else{
        document.getElementById("barGradient")?.classList.add("blackWhiteScale")
        this.minBarVal = 0;
        if(typeof this.mutiplierValue != undefined){
          this.maxBarVal = this.round(this.highestBarCount / (this.mutiplierValue as number));
          (elemList[i] as HTMLElement).style.backgroundColor = this.getArticleCountBGColor((elemList[i] as HTMLElement).id, this.mutiplierValue as number);
        }else{
          this.maxBarVal = this.maxBarVal / (this.mutiplierValue as number);
          (elemList[i] as HTMLElement).style.backgroundColor = this.getArticleCountBGColor((elemList[i] as HTMLElement).id, 1);
        }
      }
    }
    
  }

  getSentimentBGColor(value: string, multiplier: number): string{
    return this.colorGenerator.getSentimentColor(parseFloat(value) * multiplier);
  }

  getArticleCountBGColor(value: string, multiplier: number): string{
    // Get max articleCount 
    var maxNum: number = 0;
    if(this.doAdvanced == "true"){
      for(var i:number=0; i<this.textDataArray.length; i++){
        if(this.textDataArray[i]["maxCount"] > maxNum){
          maxNum = this.textDataArray[i]["maxCount"];
        }
      }
    }else{
      maxNum = this.highestBarCount;
    }
    return this.colorGenerator.getCountColor((parseFloat(value) * multiplier) / maxNum)
  }

}

