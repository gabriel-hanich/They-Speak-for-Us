import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDbDataService } from 'src/app/services/get-db-data.service';
import { apiArticleResponse } from 'src/model';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.scss']
})
export class SearchScreenComponent implements OnInit {
  public searchString: string;
  public sentimentVal: number;
  public responseList: Array<apiArticleResponse>;

  constructor(private route: ActivatedRoute, private getDbDataService: GetDbDataService) { }

  ngOnInit(): void {
    this.sentimentVal = 0.5
    this.route.params.subscribe((params)=>{
      this.searchString = params["searchString"];

      // Read data from API
      this.getDbDataService.getSearchData(this.searchString, "sentimentScore", 1).subscribe((res)=>{
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
        this.responseList = res
      })
    });
  }

  getDialColor(value: number): string{
    if(value < -0.5){
      return "#e62c4e"
    }else if(value < -0.25 && value > -0.15){
      return "##c75f72"
    }else if(value < 0.15 && value > -0.15){
      return "#ad9ea1"
    }else if(value < 0.5 && value > 0.15){
      return "#6ac46d"
    }else{
      return "#3dc441"
    }
  }

}
