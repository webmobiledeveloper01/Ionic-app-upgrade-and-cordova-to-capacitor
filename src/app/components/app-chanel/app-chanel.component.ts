import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chanel',
  templateUrl: './app-chanel.component.html',
  styleUrls: ['./app-chanel.component.scss'],
})
export class AppChanelComponent implements OnInit {

  @Input() Group: any;
  @Output() OnClick : EventEmitter<any> = new EventEmitter<any>();

  

  constructor() { }

  ngOnInit() {}


  HasBeenClicked(){
    this.OnClick.emit(this.Group)
  }

}
