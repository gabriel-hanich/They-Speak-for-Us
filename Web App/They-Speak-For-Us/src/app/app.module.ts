import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { MenuBarComponent } from './components/sub-components/menu-bar/menu-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/sub-components/footer/footer.component';
import { ExplorePageComponent } from './components/pages/explore-page/explore-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MenuBarComponent,
    FooterComponent,
    ExplorePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_MOMENT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class AppModule { }