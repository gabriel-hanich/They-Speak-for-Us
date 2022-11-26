import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { GetDataService } from 'src/app/services/get-data/get-data.service';
import { Series, GraphOptions, Point } from 'src/types';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.scss']
})
export class ExplorePageComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  public outletList: String[] = [];
  public dropdownIco = faCaretDown;
  
  public graphOptions: GraphOptions;

  public mainChartOptions: any = {
    theme: "dark2",
    zoomEnabled: true,
    exportEnabled: true,
    title: {
      text: "Loading...",
      fontFamily: "Manrope"
    },
    axisX: {
      valueFormatString: "DD MMM YYYY"
    },
    toolTip: {
      shared: true
    },
    data: []
  };

  private mainChart: any;
  private staleData = true;

  constructor(private getCloudData: GetDataService) { }

  ngOnInit(): void {
    // Set generic start and end dates
    let startDate: Date = new Date();
    startDate.setFullYear(2021, 9, 15);
    let endDate: Date = new Date();

    // TODO Delete
    this.graphOptions = {
      "title": "Series 1 vs Series 2",
      "startDate": startDate,
      "endDate": endDate,
      "plotType": "count",
      "seriesList": []
    }
    // Add testing series 
    this.graphOptions.seriesList.push({"name": "republicans", "color": "#ef233c", "keywordList": ["donald", "trump"], "outlet": "all", "points": []})
    this.graphOptions.seriesList.push({"name": "democrats", "color": "#c45ab3", "keywordList": ["joe", "biden"], "outlet": "all", "points": []})
    this.outletList = ["BBC News", "ABC News", "The Guardian", "Al Jazeera"];
    this.getData();

    // Listen for changes to the start and end dates
    this.range.valueChanges.subscribe(res =>{
      if(res.start != null){
        this.graphOptions.startDate = new Date(res.start);
      } if(res.end != null){
        this.graphOptions.endDate = new Date(res.end);
      }
      if(res.start != null || res.end != null){
        this.renderChart();
      }

    });
  }

  // Load the chart instance into the ts file
  setChartInstance(chart: object, chartName: String){
    if(chartName == "main"){
      this.mainChart = chart;
    }
  }

  // Update a given setting for the graph 
  updateSetting(key: String, value: any, seriesIndex: number | undefined, getNewData: boolean){
    if(seriesIndex != undefined){
      if(key === "keywordList"){
        var newValue: String[] = [];
        value.forEach((keyword: string)=>{
          if(keyword.length != 0){
            newValue.push(keyword.trim());
          }
        });
        value = newValue;
      }
      // @ts-ignore: Type String
      this.graphOptions.seriesList[seriesIndex][key] = value;
    }else{
      // @ts-ignore: Type String
      this.graphOptions[key] = value
    }
    if(getNewData){
      this.staleData = true
    }    
  }
  
  async getData(): Promise<void>{
    console.log("GETTING DATA")
    // Get data from the cloud
    return new Promise((resolve, reject)=>{
      this.getCloudData.getMediaData(this.graphOptions).subscribe((res: any)=>{
        console.log(res);
        if(res.sucess){
          let i=0;
          this.graphOptions.seriesList.forEach((series: Series)=>{
            let seriesData = res["data"][series.name.toString()];
            let cleanSeriesData: Point[] = [];
            let dates = Object.keys(seriesData);
            dates.forEach((date)=> cleanSeriesData.push({"date": new Date(date), "value": seriesData[date]}))

            this.graphOptions["seriesList"][i]["points"] = cleanSeriesData;
            i++;
            this.staleData = false;
            this.renderChart();
            resolve();
          });
        }else{
          reject();
        }

      })
    })

  }

  updateChart():void{
    if(this.staleData){
      this.getData();
    }else(this.renderChart());
  }

  renderChart():void{
    this.mainChartOptions.title.text = this.graphOptions.title.toString();
    this.mainChartOptions.data = [];
    this.graphOptions.seriesList.forEach((series: Series)=>{
      console.log(series);
      let seriesData: any[] = [];
      series.points.forEach((point: Point)=> seriesData.push({"x": new Date(point["date"]), "y": point["value"]}));
      let seriesOptions = {
        name: series.name,
        type: "line",
        color: series.color,
        showInLegend: true,
        dataPoints: seriesData
      };
      this.mainChartOptions.data.push(seriesOptions)
    });

    this.mainChart.render();
  }


}
