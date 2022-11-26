import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { faCaretDown, faTrash } from '@fortawesome/free-solid-svg-icons';
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
  public deleteIco = faTrash;
  
  public graphOptions: GraphOptions;

  public mainChartOptions: any = {
    theme: "dark2",
    zoomEnabled: true,
    height: 500,
    exportEnabled: true,
    animationEnabled: true,
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

  public loading: boolean = true;
  public errorOccured: boolean = false;
  private mainChart: any;
  private staleData: boolean = true;
  private userCredentials: object;

  constructor(private getCloudData: GetDataService, private router: Router) { }

  ngOnInit(): void {
    // Set generic start and end dates
    if(localStorage.getItem("tsfuUserData") == null){
      this.router.navigateByUrl("signin");
    }else{
      this.userCredentials = JSON.parse(localStorage.getItem("tsfuUserData") as string);
    }

    if(!this.loadChartSettings()){
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
    };
    this.getData();

    this.range.setValue({start: this.graphOptions.startDate, end: this.graphOptions.endDate});

    // Listen for changes to the start and end dates
    this.range.valueChanges.subscribe(res =>{
      if(res.start != null){
        this.updateSetting("startDate", new Date(res.start), undefined, true);
      } if(res.end != null){
        this.updateSetting("endDate", new Date(res.end), undefined, true);
      }
    });

    this.getCloudData.getOutlets().then((res)=> this.outletList = res);
  }

  // Load chart settings from localstorgae
  loadChartSettings():boolean{
    if(localStorage.getItem("chartOptions") != null){
      this.graphOptions = JSON.parse(localStorage.getItem("chartOptions") as string);
      this.graphOptions.startDate = new Date(this.graphOptions.startDate);
      this.graphOptions.endDate = new Date(this.graphOptions.endDate);
      return true;
    }else{
      return false;
    }
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
    }else{
      this.renderChart();
    }
    localStorage.setItem("chartOptions", JSON.stringify(this.graphOptions));
  }

  // Delete a given series
  deleteSeries(index: number): void{
    this.graphOptions.seriesList.splice(index, 1)
  }

  // Add new series
  addSeries(): void{
    this.staleData = true;
    this.graphOptions.seriesList.push({
      "name": "Series" + (this.graphOptions.seriesList.length + 1).toString(),
      "color": "#ef233c",
      "keywordList": [],
      "outlet": "all",
      "points": []
    })
  }
  
  async getData(): Promise<void>{
    this.loading = true;
    console.log("GETTING DATA");
    // Get data from the cloud
    return new Promise((resolve, reject)=>{
      this.getCloudData.getMediaData(this.graphOptions, this.userCredentials).subscribe((res: any)=>{
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
          if(res.reason === "INVALID_CREDENTIALS"){
            this.errorOccured = true;
          }
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
    this.loading = false;
    setTimeout(()=>{
      this.mainChart.render();
    }, 100)


  }



}
