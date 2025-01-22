import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HistoricPlace } from 'src/app/models/historic-place';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-memoria-pagina',
  templateUrl: './memoria-pagina.page.html',
  styleUrls: ['./memoria-pagina.page.scss'],
standalone: false,
})
export class MemoriaPaginaPage implements OnInit {

  public place: HistoricPlace;
  public comentario:any;
  public comentarios: any [] = [];
  public user:User

  constructor(private navCtrl: NavController,
    private apiService:ApiService,
    private utilities: UtilitiesService) { }

  ngOnInit() {
    this.place = history.state.place;
    console.log(this.place);
    this.apiService.getEntity('comentarios',this.place.id).subscribe((comentarios) =>{
      this.comentarios = comentarios
      console.log(this.comentarios);

    });

    this.apiService.getEntity('user').subscribe((user) =>{
      this.user = user
    })
  }


  public back(){
    this.navCtrl.back();
  }

  public enviarComentario(){
    console.log(this.comentario);

    let params = {
      'comentario':this.comentario,
      'publicacion_id': this.place.id
        }

        this.apiService.addEntity('comentarios',params).subscribe((comentario) =>{
          this.comentarios.push(comentario);
          this.utilities.showToast('Comentario enviado');
        })
  }

}
