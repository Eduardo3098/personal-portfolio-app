import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiseComponent } from './expertise.component';

describe('ExpertisComponent', () => {
  let component: ExpertiseComponent;
  let fixture: ComponentFixture<ExpertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
