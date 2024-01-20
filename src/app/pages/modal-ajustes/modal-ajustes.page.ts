import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import {
  NativeGeocoder,
  NativeGeocoderOptions,
  NativeGeocoderResult,
} from "@ionic-native/native-geocoder/ngx";

@Component({
  selector: "app-modal-ajustes",
  templateUrl: "./modal-ajustes.page.html",
  styleUrls: ["./modal-ajustes.page.scss"],
})
export class ModalAjustesPage implements OnInit {
  public direccion: any;
  public grupos: any;
  public grupoElegido: any;
  Lugares: any = [];

  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiService,
    private nativeGeocoder: NativeGeocoder
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
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5,
    };
    this.nativeGeocoder
      .forwardGeocode(this.direccion, options)
      .then((result: NativeGeocoderResult[]) => {
        this.Lugares = result;
        console.log(this.Lugares);
      })
      .catch((error: any) => {
        this.Lugares = [];
      });
  }
}
