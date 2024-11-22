import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-reportar',
  templateUrl: './modal-reportar.page.html',
  styleUrls: ['./modal-reportar.page.scss'],
})
export class ModalReportarPage implements OnInit {
  public publicacion_id: any;
  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.publicacion_id = this.navParams.get('id');
    console.log('ModalReportarPage');
  }

  async closeModal(value = true) {
    await this.modalController.dismiss();
  }
}
