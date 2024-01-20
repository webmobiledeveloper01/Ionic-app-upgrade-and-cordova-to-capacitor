import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ModalReportarMotivoPage } from '../modal-reportar-motivo/modal-reportar-motivo.page';

@Component({
  selector: 'app-modal-reportar-publicacion',
  templateUrl: './modal-reportar-publicacion.page.html',
  styleUrls: ['./modal-reportar-publicacion.page.scss'],
})
export class ModalReportarPublicacionPage implements OnInit {

  public publicacion_id:any;

  constructor(private navParams: NavParams,
    private modalController: ModalController) { }

  ngOnInit() {
    this.publicacion_id = this.navParams.data.id


    console.log("ModalReportarPublicacionPage");
    
  }

  async closeModal(boolean) {
    await this.modalController.dismiss(boolean);
  }

  async reportar(){
    
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: ModalReportarMotivoPage,
      cssClass: 'modal-eliminar',  
      componentProps: {
        id:this.publicacion_id
      }    
    });
    await modal.present();

  }
 
}