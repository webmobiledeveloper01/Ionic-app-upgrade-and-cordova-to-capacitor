import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-group',
  templateUrl: './app-chat-group.component.html',
  styleUrls: ['./app-chat-group.component.scss'],
})
export class AppChatGroupComponent {

  @Input() icon: string;
  @Input() redirection: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() lastMessage: string;
  @Input() newMessages: number;
  @Input() slidingOptionsSide: string;
  @Input() slidingOptionsColor: string;
  @Input() slidingOptionsIcon: string;

  constructor() { }

}
