import { Component, OnInit } from '@angular/core';
import { faCaretDown, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Series } from 'src/types';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.scss']
})
export class ExplorePageComponent implements OnInit {
  public seriesList: Series[] = [];
  public outletList: String[] = [];
  public dropdownIco = faCaretDown;

  public chartOptions = {
    theme: "dark1",
    title: {
      text: "Basic Column Chart in Angular",
      fontFamily: "Manrope"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "Apple",  y: 10  },
        { label: "Orange", y: 15  },
        { label: "Banana", y: 25  },
        { label: "Mango",  y: 30  },
        { label: "Grape",  y: 28  }
      ]
    }]
  };

  constructor() { }

  ngOnInit(): void {
    this.seriesList.push({"name": "Series 1", "color": "#ef233c", "keywordList": ["deez", "nuts"], "outletList": ["*"]})
    this.seriesList.push({"name": "Series 2", "color": "#ef233c", "keywordList": ["deez", "nuts"], "outletList": ["*"]})
    this.outletList = ["BBC News", "ABC News", "The Guardian", "Al Jazeera"]
  }

  updateSetting(key: String, value: any, index: number){
    console.log(key);
    // @ts-ignore: Type String
    this.seriesList[index][key] = value;
  }

}
