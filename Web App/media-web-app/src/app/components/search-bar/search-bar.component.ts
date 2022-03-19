import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  onWindowScroll(){ // Minimize search bar when you scroll down the page
    var searchBar = document.getElementById("search-bar");
    if(window.scrollY > 15){ // Scroll down
      searchBar?.classList.add("small-container")
      searchBar?.classList.remove("large-container")
    }else{ // Scroll to top
      searchBar?.classList.add("large-container")
      searchBar?.classList.remove("small-container")
    }

  }
}
