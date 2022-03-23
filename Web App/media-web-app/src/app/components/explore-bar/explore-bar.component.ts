import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DateConverterService } from 'src/app/services/date-converter.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-explore-bar',
  templateUrl: './explore-bar.component.html',
  styleUrls: ['./explore-bar.component.scss'],
  providers: []
})
export class ExploreBarComponent implements OnInit {
  public categoriesList: Array<string>;
  public selectedCategory: String;
  public dateSelector: FormGroup;

  constructor(private router: Router, private dateConverter: DateConverterService) { }

  ngOnInit(): void {
    this.categoriesList = env.categories;
    this.selectedCategory = this.categoriesList[0];

    this.dateSelector = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl()
    });
  }

  clickExplore():void{
    var startDateString: string = this.dateConverter.dateToString(this.dateSelector.value.startDate)
    var endDateString: string = this.dateConverter.dateToString(this.dateSelector.value.endDate)

    this.router.navigate(["details", this.selectedCategory, startDateString, endDateString])
  }

}
