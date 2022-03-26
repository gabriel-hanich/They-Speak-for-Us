import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionErrorScreenComponent } from './components/connection-error-screen/connection-error-screen.component';
import { GraphScreenComponent } from './components/graph-screen/graph-screen.component';
import { HomePageComponent } from './components/home-page/home-page.component';

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
    path: "details/:category",
    component: GraphScreenComponent
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
