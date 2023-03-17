import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, ViewChild} from '@angular/core';
import {
  ENTER_SCALE,
  TRANSITION_AREA_SLIDE,
  TRANSITION_IMAGE_SCALE,
  TRANSITION_TEXT
} from "../../../../ui/animations/transitions/transitions.constants";
import {
  distinctUntilChanged,
  map,
  Observable,
  ReplaySubject,
  scan,
  startWith,
  switchMap,
  takeUntil,
  takeWhile
} from "rxjs";
import {MediaObserver} from "@angular/flex-layout";
import {ScrollDispatcher, ViewportRuler} from "@angular/cdk/scrolling";
import {UiUtilsView} from "../../../../ui/utils/views.utils";

@Component({
  selector: 'home-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_AREA_SLIDE,
    TRANSITION_IMAGE_SCALE,
    ENTER_SCALE
  ]
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false
  _mTriggerAnim?= 'false'
  _mThreshold = 0.2
  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  constructor(public el: ElementRef,
              private _ngZone: NgZone,
              private cdr: ChangeDetectorRef,
              public mediaObserver: MediaObserver,
              private scroll: ScrollDispatcher,
              private viewPortRuler: ViewportRuler) { }

  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }

  private setupAnimation() {
    if (!this.vAnimRefView) return;
    this.scroll.ancestorScrolled(this.vAnimRefView, 100).pipe(
      // Makes sure to dispose on destroy
      takeUntil(this.destroyed$),
      startWith(0),
      map(() => {
        if (this.vAnimRefView != null) {
          return UiUtilsView.getVisibility(this.vAnimRefView, this.viewPortRuler)
        }
        return 0;
      }),
      scan<number, boolean>((acc: number | boolean, val: number) => (val >= this._mThreshold || (acc ? val > 0 : false))),
      // Distincts the resulting triggers
      distinctUntilChanged(),
      // Stop taking the first on trigger when aosOnce is set
      takeWhile(trigger => {
        return !trigger || !this.mOnceAnimated
      }, true),
      switchMap(trigger => new Observable<number | boolean>(observer => this._ngZone.run(() => observer.next(trigger))))
    ).subscribe(val => {
        if (this.mOnceAnimated) {
          return;
        }

        if (val) {
          this.mOnceAnimated = true
          this._mTriggerAnim = 'true'
          this.cdr.detectChanges()
        }
      }
    )
  }
}
