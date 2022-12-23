import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorePageComponent } from './components/pages/explore-page/explore-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';

const routes: Routes = [
  {
    "path": "",
    component: HomePageComponent
  },
  {
    "path": "explore",
    component: ExplorePageComponent
  },
  {
    "path": "signin",
    component: SignInComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
