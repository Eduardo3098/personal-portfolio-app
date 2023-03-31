import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'expertise-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input('jobType') set jobType(data: string){
    if(data){
      this._mJobType = data;
    }
  };
  @Input('parts') set parts(data: string[]) {
    if (data && data.length>0) {
      this._mParts = data.join(" | ")
    }
  }
  @Input('isColored') set isColored(data: boolean) {
    if (data) {
      this._mIsColored = data
    }
  }
  _mParts: string  = ""
  _mJobType: string = ""
  _mIsColored: boolean = false
}
