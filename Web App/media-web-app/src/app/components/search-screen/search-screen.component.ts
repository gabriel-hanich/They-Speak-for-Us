import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.scss']
})
export class SearchScreenComponent implements OnInit {
  public searchString: string;
  public sentimentVal: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sentimentVal = 0.5
    this.route.params.subscribe((params)=>{
      this.searchString = params["searchString"]
    })
  }

}
