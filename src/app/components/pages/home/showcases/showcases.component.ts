import {ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {TRANSITION_IMAGE_SCALE, TRANSITION_TEXT} from "../../../../ui/animations/transitions/transitions.constants";
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
import {MediaChange, MediaObserver} from "@angular/flex-layout";
import {ScrollDispatcher, ViewportRuler} from "@angular/cdk/scrolling";
import {UiUtilsView} from "../../../../ui/utils/views.utils";

@Component({
  selector: 'home-showcases',
  templateUrl: './showcases.component.html',
  styleUrls: ['./showcases.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ]
})
export class ShowcasesComponent {
  readonly ICONS_2: string = "assets/img/icons/icon_set_2.png"
  readonly ICONS_2_XS = "assets/img/icons/icon_set_2_xs.png"
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false

  _mIcon2 = "assets/img/icons/icon_set_2.png"
  _mTriggerAnim?= 'false'
  _mThreshold = 0.2
  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  constructor(public el: ElementRef,
              private _ngZone: NgZone,
              private cdr: ChangeDetectorRef,
              public mediaObserver: MediaObserver,
              private scroll: ScrollDispatcher,
              private viewPortRuler: ViewportRuler) {
    this.mediaObserver.asObservable().subscribe((mediaChange: MediaChange[]) => {

      if (mediaChange.length > 0) {
        if (mediaChange[0].mqAlias == "xs") {
          this._mIcon2 = this.ICONS_2_XS
        }else{
          this._mIcon2 = this.ICONS_2
        }
      }
    });
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
