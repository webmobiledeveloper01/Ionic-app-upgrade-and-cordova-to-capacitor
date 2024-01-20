import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-terminos-condiciones',
  templateUrl: './terminos-condiciones.page.html',
  styleUrls: ['./terminos-condiciones.page.scss'],
})
export class TerminosCondicionesPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }

  public back(){
    this.navCtrl.back();
  }

}
