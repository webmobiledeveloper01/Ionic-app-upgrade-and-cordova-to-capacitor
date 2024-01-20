import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-aviso-legal',
  templateUrl: './aviso-legal.page.html',
  styleUrls: ['./aviso-legal.page.scss'],
})
export class AvisoLegalPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }
  back(){
    this.navCtrl.back();
  }

}
