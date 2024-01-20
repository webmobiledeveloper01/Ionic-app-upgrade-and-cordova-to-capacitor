import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './app-loading.component.html',
  styleUrls: ['./app-loading.component.scss'],
})
export class AppLoadingComponent {

  @Input() color: string = "secondary";
  @Input() text: string;

  constructor() { }

}
