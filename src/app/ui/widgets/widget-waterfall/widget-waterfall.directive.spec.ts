import { WidgetWaterfallDirective } from './widget-waterfall.directive';
import {Renderer2, Type} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";

describe('WidgetWaterfallDirective', () => {
  let fixture: ComponentFixture<WidgetWaterfallDirective>;
  let renderer2: Renderer2;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        Renderer2
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetWaterfallDirective);
    renderer2 = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
  });

  it('should create an instance', () => {

    const directive = new WidgetWaterfallDirective(renderer2, un, null,
      null, null, null, null, null, null);
    expect(directive).toBeTruthy();
  });
});
