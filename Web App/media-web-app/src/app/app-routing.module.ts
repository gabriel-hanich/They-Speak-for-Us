import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionErrorScreenComponent } from './components/connection-error-screen/connection-error-screen.component';
import { GraphScreenComponent } from './components/graph-screen/graph-screen.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent
  },
  {
    path: "details/:category/:startDate/:endDate/:advancedSearch",
    component: GraphScreenComponent
  },
  {
    path: "search/:category/:startDate/:endDate/:advancedSearch",
    component: LoadingPageComponent
  },
  {
    path: "connection_error",
    component: ConnectionErrorScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
