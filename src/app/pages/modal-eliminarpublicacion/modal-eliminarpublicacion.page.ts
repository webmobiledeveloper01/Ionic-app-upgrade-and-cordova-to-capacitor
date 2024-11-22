import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-modal-eliminarpublicacion',
  templateUrl: './modal-eliminarpublicacion.page.html',
  styleUrls: ['./modal-eliminarpublicacion.page.scss'],
})
export class ModalEliminarpublicacionPage implements OnInit {

  @Input() id: Number;

  constructor(private navCtrl: NavController,
    private utilities: UtilitiesService,
    private api: ApiService,
    private modalController: ModalController
) { }

  ngOnInit() {
    console.log(this.id);
    
  }

  public goBack(){
    this.navCtrl.back();
  }

  async closeModal(boolean) {
    await this.modalController.dismiss(boolean);
  }

}
