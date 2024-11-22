import { ApplicationRef, Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import {
  NativeGeocoder,
  NativeGeocoderOptions,
  NativeGeocoderResult,
} from "@awesome-cordova-plugins/native-geocoder/ngx";
import { FormGroup } from "@angular/forms";
@Component({
  selector: "app-modal-localizacion",
  templateUrl: "./modal-localizacion.page.html",
  styleUrls: ["./modal-localizacion.page.scss"],
})
export class ModalLocalizacionPage implements OnInit {
  params: number;
  NoResult: boolean = undefined;
  isSearched: boolean = false;
  isLoadingPlaces: boolean = false;
  resultadosDireccion: NativeGeocoderResult[];
  direccion: string;
  isCountry: boolean = false;
  isRegion: boolean = false;
  isProvince: boolean = false;
  isTown: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private NatGeo: NativeGeocoder,
    private appref: ApplicationRef,
  ) {}

  ngOnInit() {
    window.addEventListener("keyboardWillShow", () => {
      console.log("Keyboard will Show");
      this.resultadosDireccion = [];
      this.appref.tick();
    });

    console.log("EN LA MODAL LLEGA", this.params);

    this.setVisibilityState(this.params);
  }
  setVisibilityState(state) {
    switch (state) {
      case 1:
        this.isCountry = true;
        break;
      case 2:
        this.isRegion = true;
        break;
      case 3:
        this.isProvince = true;
        break;
      case 4:
        this.isTown = true;
        break;
    }
  }

  SearchLocation() {
    this.SetNewSearch();
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5,
    };
    console.log(this.direccion);

    this.NatGeo.forwardGeocode(this.direccion.trim(), options)
      .then((response) => {
        console.log("RESPONSE=>");
        console.log(response);

        this.resultadosDireccion = response;

        this.resultadosDireccion = this.FilterResults();

        this.resultadosDireccion.length > 0
          ? (this.NoResult = false)
          : (this.NoResult = true);
        this.isLoadingPlaces = false;

        console.log(this.NoResult);
      })
      .catch((err) => {
        console.log(err);
        this.resultadosDireccion = [];
        this.NoResult = true;
        this.isLoadingPlaces = false;
      });
  }
  SetNewSearch() {
    this.resultadosDireccion = [];
    this.isSearched = true;
    this.isLoadingPlaces = true;
    this.NoResult = false;
  }

  FilterResults(): NativeGeocoderResult[] {
    let filtered = this.resultadosDireccion;

    let entity = "";
    if (this.isCountry) {
      entity = "countryName";
    }

    if (this.isTown) {
      entity = "locality";
    }

    if (this.isRegion) {
      entity = "subAdministrativeArea";
    }
    if (this.isProvince) {
      entity = "administrativeArea";
    }

    filtered = this.FiltersameEntity(entity, filtered);

    return filtered;
  }

  SelectLocation(r) {
    console.log("Selected=>", r);
    this.DismissModal(r);
  }

  FiltersameEntity(entity, array) {
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      console.log("Entity", entity);

      console.log(element[entity]);

      if (element[entity] === undefined || element[entity] === "") {
        array.splice(index, 1);
        console.log("hace el splice");
      } else {
        for (let y = index + 1; y < array.length; y++) {
          const elementoin = array[y];
          if (elementoin[entity] === element[entity]) {
            array.splice(y, 1);
          }
        }
      }
    }
    return array;
  }

  async DismissModal(data) {
    await this.modalCtrl.dismiss(data);
  }
}
