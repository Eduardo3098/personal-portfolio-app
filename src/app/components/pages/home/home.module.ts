import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import { TopComponent } from './top/top.component';


@NgModule({
  declarations: [
    HomeComponent,
    TopComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ExtendedModule,
    FlexModule
  ]
})
export class HomeModule { }
