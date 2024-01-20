import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-chat-header',
  templateUrl: './app-chat-header.component.html',
  styleUrls: ['./app-chat-header.component.scss'],
})
export class AppChatHeaderComponent  {

  @Input() chatName: string;
  @Input() lastMessage: string;

  constructor(private navCtrl:NavController) { }


  back(){
    this.navCtrl.back();
  }

}
