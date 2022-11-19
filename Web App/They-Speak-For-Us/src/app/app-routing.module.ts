import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorePageComponent } from './components/pages/explore-page/explore-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';

const routes: Routes = [
  {
    "path": "",
    component: HomePageComponent
  },
  {
    "path": "explore",
    component: ExplorePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
