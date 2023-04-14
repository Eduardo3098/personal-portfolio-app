import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {TRANSITION_IMAGE_SCALE, TRANSITION_TEXT} from "../../../../../ui/animations/transitions/transitions.constants";
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
import {FormBuilder} from "@angular/forms";
import {UiUtilsView} from "../../../../../ui/utils/views.utils";

@Component({
  selector: 'showcases-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ]
})
export class AppComponent implements AfterViewInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false
  _mTriggerAnim?= 'false'
  _mThreshold = 0.4


  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  constructor(public el: ElementRef,
             private _ngZone: NgZone,
             private cdr: ChangeDetectorRef,
             public mediaObserver: MediaObserver,
             private scroll: ScrollDispatcher, private viewPortRuler: ViewportRuler) {
  }

  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  ngOnDestroy(): void {

    this.destroyed$.next(true)
    this.destroyed$.complete()
  }

  public setupAnimation() {
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

  _mClientApps = [

    {
      "id": "5131",
      "name": "Pichincha Token - Android",
      "image": "assets/img/clients/Android.png",
      "link": "https://play.google.com/store/apps/details?id=com.pichincha.empresas.token&hl=en&gl=US",
      "tab": "Android",
      "color": "#FFFFFF"
    },
    {
      "id": "5132",
      "name": "Pichincha Token - IOS",
      "image": "assets/img/clients/Ios.png",
      "link": "https://apps.apple.com/ec/app/pichincha-token/id1537139058",
      "tab": "IOS"
    },
  ];
}
