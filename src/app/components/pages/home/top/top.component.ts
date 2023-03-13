import { Component } from '@angular/core';
import {
  ENTER_SCALE,
  TRANSITION_TEXT,
  TRANSITION_TEXT_ENTER
} from "../../../../ui/animations/transitions/transitions.constants";

@Component({
  selector: 'home-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_TEXT_ENTER,
    ENTER_SCALE
  ]
})
export class TopComponent {
  _mAnimTextEnded = false
  _onTextAnimationEnd($event: any) {
    if ($event['toState'] == "in") {
      this._mAnimTextEnded = true;
    }
  }
}
