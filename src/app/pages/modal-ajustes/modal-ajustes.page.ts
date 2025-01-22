import { Component, OnInit } from "@angular/core";
import { IonicModule, ModalController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import {
  NativeGeocoder,
  ForwardOptions
} from "@capgo/nativegeocoder";

@Component({
  selector: "app-modal-ajustes",
  templateUrl: "./modal-ajustes.page.html",
  styleUrls: ["./modal-ajustes.page.scss"],
standalone: false,

})
export class ModalAjustesPage implements OnInit {
  public direccion: any;
  public grupos: any;
  public grupoElegido: any;
  Lugares: any = [];

  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.apiService.getEntity("temas").subscribe((grupos) => {
      this.grupos = grupos;
    });
  }

  closeModal() {
    this.modalCtrl.dismiss(this.direccion);
  }

  cambiarTema(event) {
    this.grupoElegido = event.detail.value;
  }

  closeModalSin() {
    this.modalCtrl.dismiss();
  }

  closeModalWithSelected(l) {
    let latlong = {
      lat: l.latitude,
      lng: l.longitude,
    };
    this.modalCtrl.dismiss(latlong);
  }

  GetLocalizaciones() {
    let options: ForwardOptions = {
      addressString: this.direccion,
      useLocale: true,
      maxResults: 5,
    };
    NativeGeocoder
      .forwardGeocode(options)
      .then((result) => {
        this.Lugares = result.addresses;
        console.log(this.Lugares);
      })
      .catch((error: any) => {
        this.Lugares = [];
      });
  }

  SetDateValue(value: any){

  }
}
