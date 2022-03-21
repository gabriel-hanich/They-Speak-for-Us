import { Component, Input, OnInit } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-explore-bar',
  templateUrl: './explore-bar.component.html',
  styleUrls: ['./explore-bar.component.scss']
})
export class ExploreBarComponent implements OnInit {
  public categoriesList: Array<string>;
  constructor() { }

  ngOnInit(): void {
    this.categoriesList = env.categories;
  }

}
