import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss']
})
export class LoadingPageComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void { // Redirects to details to page to force reload of graph
    this.route.params.subscribe((params)=>{
      this.router.navigate(["details", params["category"], params["startDate"], params["endDate"], params["advancedSearch"]]);
    });
  }

}
