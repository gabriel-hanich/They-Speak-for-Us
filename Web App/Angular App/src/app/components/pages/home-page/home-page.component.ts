import { Component, OnInit } from '@angular/core';
import { faClock, faNewspaper, faRadio } from '@fortawesome/free-solid-svg-icons';
import { GetDataService } from 'src/app/services/get-data/get-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public articleCount: number = 0;
  public publisherCount: number = 30;
  public dayCount: number = 0;

  // Icons
  public icoNewspaper = faNewspaper;
  public icoPublisher = faRadio;
  public icoClock = faClock;

  constructor(private getCloudData: GetDataService) { }

  ngOnInit(): void {
    // Calculate how many days the program has been active
    let today = new Date();
    let startDate = new Date();
    startDate.setFullYear(2021, 9, 15);
    let difference = today.getTime() - startDate.getTime();
    this.dayCount = Math.ceil(difference / (1000 * 3600 * 24));

    this.getCloudData.getDBStats().subscribe((res: any)=>{
      this.publisherCount = res["outlets"];
      this.articleCount = res["articles"];
    });
  }

}
