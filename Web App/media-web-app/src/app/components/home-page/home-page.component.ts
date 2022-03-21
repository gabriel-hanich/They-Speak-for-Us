import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetDbDataService } from 'src/app/services/get-db-data.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  private articleCount: number;
  private articleSub: Subscription = new Subscription();
  public displayArticleCount: number;


  constructor(private getDBData: GetDbDataService) { }

  async ngOnInit(): Promise<void> {
    this.articleSub = this.getDBData.getArticleCount().subscribe(async (res: string)=>{
      this.articleCount = parseInt(res)

      this.displayArticleCount = 0
      // Count up the number of articles
      for(var i:number = 0; i<this.articleCount; i++){
        this.displayArticleCount += await this.wait(10, i*7);
        if(this.displayArticleCount - i >= this.articleCount){
          this.displayArticleCount += await this.wait(10, this.articleCount - this.displayArticleCount)
          break
        }
      }
    });

  }

  async wait(time:number, val:number): Promise<number> { // Returns val after time period
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve(val)
      }, time);
    })
  }


}
