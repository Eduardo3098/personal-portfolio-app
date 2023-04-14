import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {UiUtilsColor} from "../../../../../../ui/utils/color.utils";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input('name') set name(data: string){
    if(data){
      this._mName = data;
    }
  };

  @Input('link') set link(data: string) {
    if (data) {
      this._mAppUrl = data

      // this._mMeta = data.meta
    }
  }

  @Input('image') set image(data: string) {
    if (data) {
      this._mImage = data
    }
  }

  @Input('color') set color(data: string | undefined) {
    if (data) {
      this._mColor = data
    }
  }

  _mAppUrl: string  = ""
  _mName: string = ""
  _mImage?: string
  _mColor: string = '#FFFFFF';

  constructor(public el: ElementRef) {

  }

  ngOnInit() {
    this.bindColor();
  }

  bindColor() {
    let element = this.el.nativeElement
    element.style.setProperty('--app-primary', this._mColor);
    element.style.setProperty('--app-primary--rgb', UiUtilsColor.hexToRgb( this._mColor));
  }
}
