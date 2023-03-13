import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PortfolioToolbarComponent} from "../../components/molecules/portfolio-toolbar/portfolio-toolbar.component";

@Component({
  selector: 'app-main-view',
  standalone: true,
    imports: [CommonModule, PortfolioToolbarComponent],
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {

}
