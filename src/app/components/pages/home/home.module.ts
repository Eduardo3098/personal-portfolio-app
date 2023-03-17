import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import { TopComponent } from './top/top.component';
import { FooterComponent } from './footer/footer.component';
import {PortfolioButtonSvgComponent} from "../../atoms/portfolio-button-svg/portfolio-button-svg.component";
import { AboutComponent } from './about/about.component';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    HomeComponent,
    TopComponent,
    FooterComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ExtendedModule,
    FlexModule,
    PortfolioButtonSvgComponent,
    MatButtonModule
  ]
})
export class HomeModule { }
