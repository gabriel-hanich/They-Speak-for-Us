import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  public url: string;

  constructor(private location: Location) { }

  ngOnInit(): void {
    this.url = this.location.path();
    // Only get the first segment of the URL
    this.url = this.url.split("/")[1]
    console.log(this.url)
  }

}
