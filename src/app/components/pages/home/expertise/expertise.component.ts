import {ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {TRANSITION_IMAGE_SCALE, TRANSITION_TEXT} from "../../../../ui/animations/transitions/transitions.constants";
import {MediaObserver} from "@angular/flex-layout";
import {ScrollDispatcher, ViewportRuler} from "@angular/cdk/scrolling";
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
import {UiUtilsView} from "../../../../ui/utils/views.utils";

@Component({
  selector: 'home-expertise',
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ]
})
export class ExpertiseComponent implements OnInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false;
  _mTriggerAnim?= 'false';
  _mTriggerImage?= 'false';
  _mThreshold = 0.2
  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  _mTools = [
    {
      "id": "5131",
      "name": "Figma",
      "logo": "assets/img/tools/figma.svg",
      "link": "https://www.figma.com/",
      "tab": "design"
    },
    // web
    {
      "id": "8101",
      "name": "Angular",
      "logo": "assets/img/tools/angular.png",
      "link": "https://angular.io/",
      "tab": "web",
      "color": "#FF4369"
    },
    {
      "id": "8101",
      "name": "Micro FrontEnds Angular",
      "logo": "assets/img/tools/angular.png",
      "link": "https://angular.io/",
      "tab": "web",
    },
    {
      "id": "8103",
      "name": "WebComponents",
      "logo": "assets/img/tools/web-component-logo.png",
      "link": "https://www.webcomponents.org/",
      "tab": "web"
    },
    {
      "id": "8101",
      "name": "Stencil",
      "logo": "assets/img/tools/stencil.webp",
      "link": "https://stenciljs.com/",
      "tab": "web",
      "color": "#FF4369"
    },
    {
      "id": "8108",
      "name": "Sass",
      "logo": "assets/img/tools/sass-logo.svg",
      "link": "https://sass-lang.com/",
      "tab": "web",
      "color": "#CF649A"
    },
    {
      "id": "8104",
      "name": "Ngrx",
      "logo": "assets/img/tools/ngrx.svg",
      "link": "https://ngrx.io/",
      "tab": "web"
    },
    // android
    {
      "id": "9110",
      "name": "Android",
      "logo": "assets/img/tools/android.svg",
      "link": "https://developer.android.com/",
      "tab": "android",
      "color": "#3DDC84"
    },
    {
      "id": "9112",
      "name": "React Native",
      "logo": "https://d33wubrfki0l68.cloudfront.net/554c3b0e09cf167f0281fda839a5433f2040b349/ecfc9/img/header_logo.svg",
      "link": "https://reactnative.dev/",
      "tab": "android",
      "color": "#282c34"
    },
    // cross
    {
      "id": "4101",
      "name": "Flutter",
      "logo": "assets/img/tools/flutter_logo.svg",
      "link": "https://flutter.dev/",
      "tab": "Cross",
      "color": "#42A5F5"
    },
    {
      "id": "9113",
      "name": "RxJava",
      "logo": "assets/img/tools/RxJava-logo.png",
      "link": "http://reactivex.io/",
      "tab": "android"
    },
    {
      "id": "9115",
      "name": "Architecture Components",
      "logo": "assets/img/tools/pic_architecture_components.png",
      "link": "https://developer.android.com/topic/architecture",
      "tab": "android"
    },
    // backend
    {
      "id": "7126",
      "name": "NodeJs",
      "logo": "assets/img/tools/nodejs.png",
      "link": "https://nodejs.org/en/",
      "tab": "back-end"
    },
    {
      "id": "7126",
      "name": "Spring Boot",
      "logo": "assets/img/tools/springio.svg",
      "link": "https://nodejs.org/en/",
      "tab": "back-end",
      "color": '#6db33f'
    },
    {
      "id": "7126",
      "name": ".Net Framework",
      "logo": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Microsoft_.NET_logo.svg",
      "link": "https://learn.microsoft.com/en-us/dotnet/framework/",
      "tab": "back-end",
    },
    {
      "id": "7126",
      "name": "CodeIgniter",
      "logo": "https://cdn.worldvectorlogo.com/logos/codeigniter.svg",
      "link": "https://codeigniter.com/",
      "tab": "back-end",
    },
    // bdd
    {
      "id": "6121",
      "name": "Sql Server",
      "logo": "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31",
      "link": "https://www.microsoft.com/en-us/sql-server/sql-server-downloads",
      "tab": "bdd"
    },
    // cloud
    {
      "id": "6121",
      "name": "Firebase",
      "logo": "assets/img/tools/firebase.svg",
      "link": "https://firebase.google.com/",
      "tab": "cloud"
    },
    {
      "id": "6123",
      "name": "Jira",
      "logo": "https://cdn.worldvectorlogo.com/logos/jira-1.svg",
      "link": "https://www.atlassian.com/software/jira",
      "tab": "cloud"
    },
    {
      "id": "6123",
      "name": "Azure",
      "logo": "assets/img/tools/azure.png",
      "link": "https://azure.microsoft.com",
      "tab": "cloud"
    },
  ]

  constructor(public el: ElementRef,
              private _ngZone: NgZone,
              private cdr: ChangeDetectorRef,
              public mediaObserver: MediaObserver,
              private scroll: ScrollDispatcher,
              private viewPortRuler: ViewportRuler) { }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
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
      distinctUntilChanged(),
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
