import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pago-correcto',
  templateUrl: './pago-correcto.page.html',
  styleUrls: ['./pago-correcto.page.scss'],
standalone: false,
})
export class PagoCorrectoPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
    setTimeout(() =>{

        this.navCtrl.navigateForward('/tabs/home');


    }, 3000)

  }

}
