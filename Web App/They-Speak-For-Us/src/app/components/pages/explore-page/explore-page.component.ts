import { Component, OnInit } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Series } from 'src/types';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.scss']
})
export class ExplorePageComponent implements OnInit {
  public seriesList: Series[] = [];

  public dropdownIco = faCaretDown

  constructor() { }

  ngOnInit(): void {
    this.seriesList.push({"name": "Series 1", "color": "red", "keywordList": ["deez", "nuts"], "outletList": ["*"]})
  }

}
