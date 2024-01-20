import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-item',
  templateUrl: './app-question-item.component.html',
  styleUrls: ['./app-question-item.component.scss'],
})
export class AppQuestionItemComponent implements OnInit {


  @Input() object:any;

    isExpired:boolean;
  constructor() { }

  ngOnInit() {
    this.isExpired = this.object.isExpired;
  }



}
