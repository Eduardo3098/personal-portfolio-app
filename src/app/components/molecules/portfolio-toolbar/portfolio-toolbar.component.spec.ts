import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioToolbarComponent } from './portfolio-toolbar.component';
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('PortfolioToolbarComponent', () => {
  let component: PortfolioToolbarComponent;
  let fixture: ComponentFixture<PortfolioToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PortfolioToolbarComponent,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
