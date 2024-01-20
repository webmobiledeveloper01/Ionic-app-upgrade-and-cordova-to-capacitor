import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-modal-reportar-motivo',
  templateUrl: './modal-reportar-motivo.page.html',
  styleUrls: ['./modal-reportar-motivo.page.scss'],
})

export class ModalReportarMotivoPage implements OnInit {

  public publicacion_id: any;
  public checkSpam:boolean;
  public checkNomegusta: boolean;
  public checkDesnudo:boolean;
  public checkSuicidio:boolean;
  public checkContenido:boolean;
  public checkLenguaje:boolean;


  constructor(private navParams: NavParams,
    private apiService:ApiService,
    private utilities: UtilitiesService,
    private modalController:ModalController) { }

    

  ngOnInit() {
    this.publicacion_id = this.navParams.data.id
    console.log("ModalReportarMotivoPage");

  }

   reportar(){

    let params = {
      'spam': this.checkSpam,
      'nomegusta': this.checkNomegusta,
      'desnudo': this.checkDesnudo,
      'lenguaje': this.checkLenguaje,
      'contenido': this.checkContenido,
      'suicidio': this.checkSuicidio,
      'publicacion_id': this.publicacion_id
    };


    this.apiService.addEntity('reportar',params).subscribe((reportar) =>{
      this.utilities.showToast('Reportado con éxito');
      this.modalController.dismiss();
      
    });

  }

  cerrarModal() {
    this.modalController.dismiss();
  }
  

  spam(event){
    this.checkSpam = !this.checkSpam
  }

  nomegusta(event){
    this.checkNomegusta = !this.checkNomegusta
  }

  desnudo(event){
    this.checkDesnudo = !this.checkDesnudo
  }

  lenguaje(event){
    this.checkLenguaje = !this.checkLenguaje
  }

  contenido(event){
    this.checkContenido = !this.checkContenido
  }

  suicidio(event){
    this.checkSuicidio = !this.checkSuicidio
  }

}
