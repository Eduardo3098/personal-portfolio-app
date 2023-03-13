import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioToolbarComponent } from './portfolio-toolbar.component';

describe('PortfolioToolbarComponent', () => {
  let component: PortfolioToolbarComponent;
  let fixture: ComponentFixture<PortfolioToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PortfolioToolbarComponent ]
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
