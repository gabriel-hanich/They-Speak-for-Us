import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDbDataService } from 'src/app/services/get-db-data.service';
import { apiArticleResponse } from 'src/model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.scss']
})
export class SearchScreenComponent implements OnInit {
  public sortCategories: Array<string>;
  public searchString: string;
  public sortCategory: string;
  public sortOrder: string;
  public responseList: Array<apiArticleResponse> = [];

  private sortNum: number

  constructor(private route: ActivatedRoute,
     private getDbDataService: GetDbDataService,
     private router: Router) { }

  ngOnInit(): void {
    this.sortCategories = environment['sortCategories'] as unknown as Array<string>;

    this.sortOrder = "Ascending";
    this.route.params.subscribe((params)=>{
      this.searchString = params["searchString"];

      if(params["sortCategory"]){
        this.sortCategory = params["sortCategory"];
      }else{
        this.sortCategory = this.sortCategories[0]
      }

      if(params["sortOrder"]){
        this.sortOrder = params["sortOrder"]
      }else{
        this.sortOrder = "Descending"
      }

      if(this.sortOrder == "Ascending"){
        this.sortNum = 1;
      }else if(this.sortOrder == "Descending"){
        this.sortNum = -1
      }

      this.getListData(false);
    });
  }

  getListData(addMore: boolean):void{
    // Read data from API
    var requestCount: number = 20;
    if(addMore){
      requestCount = 20 + this.responseList.length
    }
    this.getDbDataService.getSearchData(this.searchString, this.sortCategory, this.sortNum, requestCount).subscribe((res)=>{
      console.log(res)
      for(var i: number=0; i<res.length; i++){
        res[i]["sentimentScore"] = Math.round(res[i]["sentimentScore"] * 100) / 100
        if(res[i]["description"]?.length > 150){
          for(var k: number=0; k<res[i]["description"].length - 150; k++){
            if(res[i]["description"][k + 150] == " "){
              res[i]["description"] = res[i]["description"].substring(0, k+150) + "..."
            }
          }
        }
      }
      this.responseList = res;
    });
  }

  getDialColor(value: number): string{
    if(value <= -0.5 && value < 1){
      return "#e62c4e" 
    }else if(value <= -0.15 && value > -0.5){
      return "#c75f72"
    }else if(value <= 0.15 && value > -0.15){
      return "#ad9ea1"
    }else if(value <= 0.5 && value > 0.15){
      return "#75c977"
    }else if(value > 0.5 && value < 1){
      return "#3dc441"
    }else{
      return "#ad9ea1"
    }
  }

  newSearch():void{
    this.router.navigate(["search", this.searchString, this.sortCategory, this.sortOrder])
  }

}
