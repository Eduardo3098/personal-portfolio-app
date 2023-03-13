import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatRippleModule} from "@angular/material/core";
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {PortfolioButtonSvgComponent} from "./components/atoms/portfolio-button-svg/portfolio-button-svg.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PortfolioButtonSvgComponent,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatRippleModule,
    ExtendedModule,
    FlexModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
