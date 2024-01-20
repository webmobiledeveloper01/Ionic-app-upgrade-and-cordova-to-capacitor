import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-item',
  templateUrl: './app-chat-item.component.html',
  styleUrls: ['./app-chat-item.component.scss'],
})
export class AppChatItemComponent{

  @Input() text: string;
  @Input() date: string;
  @Input() image: string;
  @Input() icon: string;

  constructor() { }

}
