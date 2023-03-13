import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {ENTER_FORM_TOP} from "../../../ui/animations/transitions/transitions.constants";
import {MatRippleModule} from "@angular/material/core";
import {RouterLink, RouterOutlet} from "@angular/router";
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {WidgetWaterfallModule} from "../../../ui/widgets/widget-waterfall/widget-waterfall.module";
import {MatSidenavModule} from "@angular/material/sidenav";

@Component({
  selector: 'portfolio-toolbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatRippleModule, RouterLink, ExtendedModule, FlexModule, WidgetWaterfallModule, MatSidenavModule, RouterOutlet],
  templateUrl: './portfolio-toolbar.component.html',
  styleUrls: ['./portfolio-toolbar.component.scss'],
  animations: [ENTER_FORM_TOP]
})
export class PortfolioToolbarComponent {
  _onToolbarAnimationEnd($event: any){
  }
}
