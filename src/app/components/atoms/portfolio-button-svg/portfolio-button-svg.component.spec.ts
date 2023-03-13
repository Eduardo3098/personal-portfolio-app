import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioButtonSvgComponent } from './portfolio-button-svg.component';

describe('ButtonComponent', () => {
  let component: PortfolioButtonSvgComponent;
  let fixture: ComponentFixture<PortfolioButtonSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioButtonSvgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioButtonSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
