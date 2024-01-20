import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-politica-privacidad',
  templateUrl: './politica-privacidad.page.html',
  styleUrls: ['./politica-privacidad.page.scss'],
})
export class PoliticaPrivacidadPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }

  back(){
    this.navCtrl.back();
  }
}
