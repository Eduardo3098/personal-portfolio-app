import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcasesComponent } from './showcases.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('ShowcasesComponent', () => {
  let component: ShowcasesComponent;
  let fixture: ComponentFixture<ShowcasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        NoopAnimationsModule
      ],
      declarations: [ ShowcasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowcasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
