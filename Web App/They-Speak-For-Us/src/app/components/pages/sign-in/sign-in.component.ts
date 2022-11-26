import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataService } from 'src/app/services/get-data/get-data.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public currentState: "input" | "loading" | "verified" | "fail" = "input";

  constructor(private cloudData: GetDataService, private router: Router) { }

  ngOnInit(): void {
  }

  verifyDetials(userName: string, pin: string){
    this.currentState = "loading";
    this.cloudData.verifyUser(userName, pin).subscribe((res: boolean)=>{
      if(res){ // If the entered credentials were correct
        this.currentState = "verified";
        localStorage.setItem("tsfuUserData", JSON.stringify({"username": userName, "pin": pin})); // Record user data
        setTimeout(()=>{
          this.router.navigateByUrl("explore");
        }, 2500)
      }else{ // If they were wrong
        this.currentState = "fail";
        setTimeout(()=>{
          this.currentState = "input";
        }, 2500)
      }
    })
  }

}
