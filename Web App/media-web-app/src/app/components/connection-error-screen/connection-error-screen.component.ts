import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-connection-error-screen',
  templateUrl: './connection-error-screen.component.html',
  styleUrls: ['./connection-error-screen.component.scss']
})
export class ConnectionErrorScreenComponent implements OnInit {
  public connectionURL: string;


  constructor() {
    this.connectionURL = environment.backEndURL
   }

  ngOnInit(): void {
  }

}
