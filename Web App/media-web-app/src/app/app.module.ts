import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ExploreBarComponent } from './components/explore-bar/explore-bar.component'
import { GraphScreenComponent } from './components/graph-screen/graph-screen.component'


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ConnectionErrorScreenComponent } from './components/connection-error-screen/connection-error-screen.component';
import { NgChartsModule } from 'ng2-charts';
import { LoadingWheelComponent } from './components/loading-wheel/loading-wheel.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    HomePageComponent,
    ExploreBarComponent,
    ConnectionErrorScreenComponent,
    GraphScreenComponent,
    LoadingWheelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSelectModule,
    MatNativeDateModule,
    HttpClientModule,
    MatDatepickerModule,
    FormsModule,
    NgChartsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
