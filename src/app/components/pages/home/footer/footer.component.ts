import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone,ViewChild} from '@angular/core';
import {TRANSITION_REVEAL} from "../../../../ui/animations/transitions/transitions.constants";
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
  selector: 'home-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations:[
    TRANSITION_REVEAL
  ]
})
export class FooterComponent implements AfterViewInit {
  date: Date;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  _mThreshold = 0.4
  mOnceAnimated = false
  _mTriggerAnim?= 'false'
  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  constructor(private _ngZone: NgZone,
              private cdr: ChangeDetectorRef,
              public mediaObserver: MediaObserver,
              private scroll: ScrollDispatcher, private viewPortRuler: ViewportRuler) {
    this.date = new Date();
  }

  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  private setupAnimation() {
    if (!this.vAnimRefView) return;
    this.scroll.ancestorScrolled(this.vAnimRefView, 100).pipe(
      // Makes sure to dispose on destroy
      takeUntil(this.destroyed$),
      startWith(0),
      map(() => {
        if (this.vAnimRefView != null) {
          return UiUtilsView.getVisibility(this.vAnimRefView, this.viewPortRuler);
        }
        return 0;

      }),
      scan<number, boolean>((acc: number | boolean, val: number) => (val >= this._mThreshold || (acc ? val > 0 : false))),
      // Distincts the resulting triggers
      distinctUntilChanged(),
      // Stop taking the first on trigger when aosOnce is set
      takeWhile(trigger => {
        // console.info("app-item  !trigger || !this.mOnceAnimated",
        //   !trigger || !this.mOnceAnimated)

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
