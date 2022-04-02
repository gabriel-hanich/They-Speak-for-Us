import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  private doAdvancedSearch: boolean = false;

  constructor(private router: Router, 
    private route: ActivatedRoute,
    private dateConverter: DateConverterService,
    private dataService: GetDbDataService) { }

  ngOnInit(): void { // Allows exploration of data
    this.categoriesList = env.categories;
    
    // Get list of outlets
    this.dataService.getOutletList().subscribe((res)=>{
      this.outletList = [{outletName: "Any"}]
      for(var i:number=0; i < res.length; i++){
        this.outletList.push(res[i]);
      }
    });

    this.route.params.subscribe((params)=>{ // Fill the fields in initially with whatever data can be found in the route
      if(params["category"]){
        this.selectedCategory = params["category"]
      }else{
        this.selectedCategory = this.categoriesList[0];
      }
      if(params["startDate"] && params["endDate"] && params["startDate"] != "09.15.2021"){ // If both dates are present AND the date isn't the default one 
        this.dateSelector = new FormGroup({
          startDate: new FormControl(this.dateConverter.stringToDate(params["startDate"])),
          endDate: new FormControl(this.dateConverter.stringToDate(params["endDate"]))
        });
      }else{
        this.dateSelector = new FormGroup({
          startDate: new FormControl(),
          endDate: new FormControl()
        });
      }
    });
  }

  clickExplore():void{ // When the form is submitted
    if(this.dateSelector.value.startDate == null || this.dateSelector.value.endDate == null){
      var startDateString: string = "09.15.2021"
      var endDateString: string = this.dateConverter.dateToString(new Date()); 
    }else{
      var startDateString: string = this.dateConverter.dateToString(this.dateSelector.value.startDate);
      var endDateString: string = this.dateConverter.dateToString(this.dateSelector.value.endDate); 
    }
    localStorage.clear(); // The advanced search data is stored in the localstorage
    if(this.doAdvancedSearch){
      localStorage.setItem("advanced_settings",JSON.stringify(this.topicList));
      this.router.navigate(["search", this.selectedCategory, startDateString, endDateString, true]);
    }else{
      this.router.navigate(["search", this.selectedCategory, startDateString, endDateString, false]);
    }

  }

  expandContainer(): void{
    if(this.expandIconName == "expand_more"){ // If the box is being expanded
      document.getElementById("exploreContainer")?.classList.add("expand");
      this.expandIconName = "expand_less";
      this.doAdvancedSearch = true;
      if(this.topicList.length == 0){
        this.topicList.push({topicNumber: 0, selectedOutletName: "Any", selectedHeadlineTerms: [], topicName: "Any"});
      }
      
    }else{
      document.getElementById("exploreContainer")?.classList.remove("expand");
      this.doAdvancedSearch = false;
      this.expandIconName = "expand_more";
    }
  }

  addNewTopic():void{ // Add a new topic
    this.topicList.push({topicNumber: this.topicList.length, selectedOutletName: "Any", selectedHeadlineTerms: [], topicName: "Any"});
    if(this.topicList.length > 3){
      document.getElementById("exploreContainer")?.classList.add("addScroll");
    }
  }
  
  removeTopic(event: Event): void{ // Delete specified topic from list
    this.topicList.splice(parseInt((event.target as Element).id[0]), 1);
    this.reOrderTopicList();
  }

  reOrderTopicList():void{ // Ensures the topic number matches up with the index of that topic in the list
    for(var i:number=0; i<this.topicList.length; i++){
      this.topicList[i]["topicNumber"] = i;
    }
  }

  inputChange(referenceClass: topic, val: any, valType: string){ // Whenever any input for the topic name or headline is changed
    console.log(val.value)
    if(valType == "topicName"){
      this.topicList[referenceClass["topicNumber"]]["topicName"] = val.value 
    }else{
      this.topicList[referenceClass["topicNumber"]]["selectedHeadlineTerms"].push(val.value);
    }
  }

  
}
