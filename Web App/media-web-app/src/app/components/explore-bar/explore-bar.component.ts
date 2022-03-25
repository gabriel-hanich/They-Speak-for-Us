import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DateConverterService } from 'src/app/services/date-converter.service';
import { GetDbDataService } from 'src/app/services/get-db-data.service';
import { environment as env } from 'src/environments/environment';
import { apiOutletResponse, topic } from 'src/model';

@Component({
  selector: 'app-explore-bar',
  templateUrl: './explore-bar.component.html',
  styleUrls: ['./explore-bar.component.scss'],
  providers: []
})
export class ExploreBarComponent implements OnInit {
  public categoriesList: Array<string>;
  public selectedCategory: String;
  public dateSelector: FormGroup;
  public expandIconName: string = "expand_more";
  public outletList: Array<apiOutletResponse>;
  public topicList: Array<topic> = [];
  public selectedTopic: string = "Any"

  constructor(private router: Router, 
    private dateConverter: DateConverterService,
    private dataService: GetDbDataService) { }

  ngOnInit(): void {
    this.categoriesList = env.categories;
    this.selectedCategory = this.categoriesList[0];

    this.dateSelector = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl()
    });

    // Get list of outlets
    this.dataService.getOutletList().subscribe((res)=>{
      this.outletList = [{outletName: "Any"}]
      for(var i:number=0; i < res.length; i++){
        this.outletList.push(res[i]);
      }
      console.log(this.outletList)
    })
  }

  clickExplore():void{
    var startDateString: string = this.dateConverter.dateToString(this.dateSelector.value.startDate)
    var endDateString: string = this.dateConverter.dateToString(this.dateSelector.value.endDate)

    this.router.navigate(["details", this.selectedCategory, startDateString, endDateString])
  }

  expandContainer(): void{
    if(this.expandIconName == "expand_more"){ // If the box is being expanded
      document.getElementById("exploreContainer")?.classList.add("expand");
      this.expandIconName = "expand_less";
      if(this.topicList.length == 0){
        this.topicList.push({selectedOutletName: "Any", selectedHeadlineTerms: []})
      }

    }else{
      document.getElementById("exploreContainer")?.classList.remove("expand");
      this.expandIconName = "expand_more"
    }
  }
    
}
