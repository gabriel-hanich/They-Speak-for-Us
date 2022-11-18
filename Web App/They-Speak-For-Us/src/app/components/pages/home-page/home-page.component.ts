import { Component, OnInit } from '@angular/core';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public articleCount: number = 0;
  public publisherCount: number = 0;

  // Icons
  public icoNewspaper = faNewspaper;

  constructor() { }

  ngOnInit(): void {
  }

}
