import { Component, OnInit } from '@angular/core';
import { GetDbDataService } from 'src/app/services/get-db-data.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  private articleCount: number;
  public displayArticleCount: number;
  public categoriesList: Array<string>;


  constructor(private getDBData: GetDbDataService) { }

  async ngOnInit(): Promise<void> {
    this.articleCount = this.getDBData.getArticleCount();
    this.displayArticleCount = 0
    this.categoriesList = env.categories;
    // Count up the number of articles
    for(var i:number = 0; i<this.articleCount; i++){
      this.displayArticleCount += await this.wait(10, i*7);
      if(this.displayArticleCount - i >= this.articleCount){
        this.displayArticleCount += await this.wait(10, this.articleCount - this.displayArticleCount)
        break
      }
    }

  }

  async wait(time:number, val:number): Promise<number> { // Returns val after time period
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve(val)
      }, time);
    })
  }

}
