import { Component, OnInit } from '@angular/core';
import { faClock, faNewspaper, faRadio } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public articleCount: number = 0;
  public publisherCount: number = 0;
  public dayCount: number = 0;

  // Icons
  public icoNewspaper = faNewspaper;
  public icoPublisher = faRadio;
  public icoClock = faClock;

  constructor() { }

  ngOnInit(): void {
  }

}
