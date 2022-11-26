import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { MenuBarComponent } from './components/sub-components/menu-bar/menu-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/sub-components/footer/footer.component';
import { ExplorePageComponent } from './components/pages/explore-page/explore-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasJSChart,
    HomePageComponent,
    MenuBarComponent,
    FooterComponent,
    ExplorePageComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_MOMENT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class AppModule { }
