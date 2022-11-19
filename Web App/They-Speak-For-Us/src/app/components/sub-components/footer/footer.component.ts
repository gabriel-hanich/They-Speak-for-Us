import { Component, OnInit } from '@angular/core';
import { faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public githubIco = faGithub;
  public mediumIco = faMedium;

  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
