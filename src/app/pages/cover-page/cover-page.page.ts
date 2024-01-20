import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-cover-page',
  templateUrl: './cover-page.page.html',
  styleUrls: ['./cover-page.page.scss'],
})
export class CoverPagePage implements OnInit {

  constructor(private menuCtrl:MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

}
