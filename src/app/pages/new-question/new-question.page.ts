import { Component, NgZone, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ModalController, NavController, Platform } from "@ionic/angular";
import moment from "moment";
import { Category } from "src/app/models/Category";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { Camera, CameraOptions, CameraResultType, CameraSource } from "@capacitor/camera";

import {
  NativeGeocoder,
  NativeGeocoderOptions,
  NativeGeocoderResult,
} from "@awesome-cordova-plugins/native-geocoder/ngx";
import { ModalAjustarImagenPage } from "../modal-ajustar-imagen/modal-ajustar-imagen.page";
import { GoogleMap, MapType } from "@capacitor/google-maps";
import { CreateMapArgs } from "@capacitor/google-maps/dist/typings/implementation";

// import {
//   Environment,
//   GoogleMap,
//   GoogleMapOptions,
//   GoogleMaps,
//   GoogleMapsEvent,
// } from "@ionic-native/google-maps";
declare let plugins: any;

@Component({
  selector: "app-new-question",
  templateUrl: "./new-question.page.html",
  styleUrls: ["./new-question.page.scss"],
})
export class NewQuestionPage implements OnInit {
  currentDate: Date = new Date();
  tomorrow = new Date();
  SetMinDate: string;
  maxYear: string = (new Date().getFullYear() + 1).toString();
  categories: Category[][];
  isLoading: boolean = true;
  public googleAutocomplete: any;
  public autocompleteItems: any[];
  public autocomplete: boolean = true;
  public search: string = "";
  form;
  members;
  map: GoogleMap;
  base64img;
  public decadas: any[] = [
    { value: 1910, nombre: "Decada 10" },
    { value: 1920, nombre: "Decada 20" },
    { value: 1930, nombre: "Decada 30" },
    { value: 1940, nombre: "Decada 40" },
    { value: 1950, nombre: "Decada 50" },
    { value: 1960, nombre: "Decada 60" },
    { value: 1970, nombre: "Decada 70" },
    { value: 1980, nombre: "Decada 80" },
    { value: 1990, nombre: "Decada 90" },
    { value: 2000, nombre: "Decada 2000" },
    { value: 2010, nombre: "Decada 2010" },
    { value: 2020, nombre: "Decada 2020" },
  ];
  positionSelected: any;

  constructor(
    private api: ApiService,
    private utils: UtilitiesService,
    private fb: FormBuilder,
    private nav: NavController,private ngZone: NgZone,
    private nativeGeocoder: NativeGeocoder,
    private platform: Platform,
    private navCtrl: NavController,
    private modcontrol: ModalController
  ) {
    this.googleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
  }

  async ngOnInit() {
    this.platform.backButton.subscribe(() => {
      console.log("BACK");

      this.nav.navigateBack("/map");
    });

    this.form = this.fb.group({
      question: ["", Validators.required],
      category_id: ["", Validators.required],
      date: ["", Validators.required],
      decada: ["", Validators.required],
      archivo: [""],
      ubicacion: [""],
      duracion: ["", Validators.required],
      visibility: ["", Validators.required],
      lat: ["", Validators.required],
      lng: ["", Validators.required],
    });

    await this.getCategories().then(async () => {
      this.isLoading = false;
    });
  }

  ionViewWillEnter() {
    this.tomorrow.setDate(this.currentDate.getDate() + 1);
    this.SetMinDate = this.tomorrow.toISOString();
  }

  //<----------------------METODOS GET---------------------->

  public async getCategories() {
    await this.api.getEntity("temas").subscribe((temas) => {
      this.categories = temas;
      console.log("TEMAS=>", temas);
    });
  }
  // async getCategories() {
  //   try {
  //     let res = await this.api.getEntity("ChanelsCategories").toPromise();

  //     console.log("RESPONSE =>");

  //     console.log(res);

  //     if (res.status === "ok") {
  //       res.data = this.categories = res.data;
  //     } else {
  //       throw new Error(res);
  //     }
  //   } catch (error) {
  //     this.utils.showAlert("¡Vaya!", "Ha ocurrido un error en el servidor");

  //     console.log(error);
  //   }
  // }

  //<----------------------FIN METODOS GET---------------------->

  //<----------------------METODO Crop---------------------->
  async openCropImageModal() {
    const modal = await this.modcontrol.create({
      component: ModalAjustarImagenPage,
      componentProps: {
        base64img: this.base64img,
        mode: "UPLOAD",
      },
    });
    modal.present();
    modal.onDidDismiss().then(async (data) => {
      console.log(data);
      if (typeof data != "undefined") {
        if (data.data.hasImage) {
          this.base64img = data.data.image;
          this.form.patchValue({ archivo: this.base64img });
        }
      }

      console.log("Se cierra la modal");
      await this.loadMap();
    });
  }

  //<----------------------FIN METODO Crop---------------------->

  //<----------------------METODO map---------------------->

  public async loadMap() {
    console.log("CARGANDO MAPA");

    // Environment.setEnv({
    //   API_KEY_FOR_BROWSER_DEBUG: "AIzaSyDnVEq799iMJ1j0FjyVA2CB5yriBuPHKdE",
    //   API_KEY_FOR_BROWSER_RELEASE: "AIzaSyDnVEq799iMJ1j0FjyVA2CB5yriBuPHKdE",
    // });
    // Environment.setBackgroundColor("white");

    //  let myPosition= await GoogleMap.getMyLocation();

    let mapOptions: CreateMapArgs = {
      id: 'map-div',
      apiKey: "AIzaSyDmfNZjzV2rN3hJZuMihXZIiB3Hjkw0LtE",
      element: document.getElementById("map-div"),
      config: {
        center:{
           lat: 0,
        lng: 0,
        },
        zoom: 12,

        //  mapTypeId: MapType.Satellite
      },

    };

    this.map = await GoogleMap.create(mapOptions, (readyCallback)=>{
      // this.map.setMapTypeId("MAP_TYPE_SATELLITE");
        this.map.enableCurrentLocation(true);
      this.map.setOnMyLocationClickListener(
        (event) => { console.log(event) }
      );
        this.map
          .getMapBounds()
          .then((response) => {
            console.log("Respuesta Localizacion Camara", response);

            this.map.setCamera({
              coordinate: response.center,
            });
          })
          .catch((error) => {
            console.log(error);
          });
    });

    // this.map.getMyLocation().then((res) => {
    //   this.map.moveCamera({
    //     target: res.latLng,
    //   });
    // });

    console.log(this.map);

    // this.map
    //   .one(GoogleMapsEvent.MAP_READY)
    //   .then(() => {

    //   })
    //   .catch((error) => {
    //     console.log(error);

    //     this.utils.showAlert(
    //       "Ubicacion desactivada",
    //       "Sin acceso a la ubicacion la publicacion no se subira correctamente"
    //     );
    //   });
  }

  //<---------------------- FIN METODO map---------------------->

  //<----------------------METODOS SET VALUES---------------------->

  SetVisibilityValue($event) {
    this.selectControl($event.target, 1);

    console.log("EVENT IS=>");

    console.log($event.target.id);

    this.form.get("visibility").setValue($event.target.id);
  }

  minStartDate(): string {
    return moment().format("YYYY-MM-DD");
  }

  SetCategoryValue($event) {
    this.selectControl($event.target, 0);

    console.log("EVENT IS=>");

    console.log($event.target.id);

    this.form.get("category_id").setValue($event.target.id);
  }

  cambiarDecada($event) {
    console.log($event);

    this.form.get("decada").patchValue($event.target.value);
  }

  selectControl(SelectedChip, options) {
    let chips;
    switch (options) {
      case 0:
        chips = document
          .getElementById("category-wrap")
          .getElementsByTagName("ion-chip");
        break;
      case 1:
        chips = document
          .getElementById("visibility-row")
          .getElementsByTagName("ion-chip");
        break;
    }

    console.log("Chips are=>");
    console.log(chips);

    for (let index = 0; index < chips.length; index++) {
      let chip = chips[index];
      if (chip.classList.contains("custom")) {
        chip.classList.remove("custom");
      }
    }
    SelectedChip.classList.toggle("custom");
  }

  //<----------------------METODO Adjuntar imagen---------------------->

 // UsingCapacitorPlugin: Camera Plugin to use Capacitor Implementation.
  // public adjuntarImagen(): void {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     targetWidth: 1920,
  //     targetHeight: 1080,
  //     allowEdit: true,
  //     correctOrientation: true,
  //   };

  //   try {
  //     // console.log("Entra en try");

  //     this.camera
  //       .getPicture(options)
  //       .then((urlFoto) => {
  //         this.base64img = "data:image/jpeg;base64," + urlFoto;
  //         this.form.patchValue({ archivo: this.base64img });

  //         console.log(urlFoto);

  //         this.chargeMap();
  //       })
  //       .catch((error) => {
  //         this.utils.showAlert("Error al obtener imagen", error);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  public async adjuntarImagen(): Promise<void> {
    const options: CameraOptions = {
      quality: 100,
      resultType: CameraResultType.DataUrl, // Use DataUrl for data URI
      source: CameraSource.Photos, // Use Photos for PhotoLibrary
      width: 1920,
      height: 1080,
      allowEditing: true,
      correctOrientation: true,
    };

    try {
      const capturedPhoto = await Camera.getPhoto(options);

      if (capturedPhoto.dataUrl) {
        this.base64img = capturedPhoto.dataUrl;
        this.form.patchValue({ archivo: this.base64img });

        console.log(capturedPhoto.dataUrl);

        this.chargeMap();
      } else {
        this.utils.showAlert("Error al obtener imagen", "No se pudo obtener la imagen");
      }
    } catch (error) {
      console.error(error);
      this.utils.showAlert("Error al obtener imagen", error.message);
    }
  }
  chargeMap() {
    console.log("Se cargaria el mapa");

    setTimeout(() => {
      let mapRow = document.getElementById("map-row-vis");

      mapRow.style.display = "block";

      this.loadMap();
    }, 1000);
  }

  setFechaValueIfVoid() {
    let fech = this.form.get("date").value;

    console.log("fecha value es =>", fech);

    console.log("fecha no estaba vacio");
    let date: string = this.form.get("date").value;
    date = date.split("T")[0];
    let year = new Date(date);
    let Checkyear = year.getFullYear();
    let decada = this.form.get("decada").value;
    let IsCorrect: boolean = false;
    if (decada !== null) {
      let CheckString = "" + Checkyear;
      let decadaString = decada.toString();
      console.log(CheckString);
      console.log(decadaString);
      console.log("SUBS");
      console.log(CheckString.substring(0, 3));
      console.log(decadaString.substring(0, 3));
      if (CheckString.substring(0, 3) === decadaString.substring(0, 3)) {
        IsCorrect = true;
        console.log("TRUE");
        return IsCorrect;
      }

      if (IsCorrect) {
        this.form.get("date").setValue(date);
        return true;
      } else {
        return false;
      }
    }
    else{
      return false;
    }
  }
  //<----------------------METODO SUBMIT---------------------->

  async CreateQuestion() {
    console.log(this.form.value);
    if (this.setFechaValueIfVoid()) {
      try {
        await this.utils.showLoading("Añadiendo pregunta");

        let duracion = this.form.get("duracion").value.split("T")[0];
        this.form.get("duracion").setValue(duracion);
        this.form.get("ubicacion").setValue(this.search);

        let res = await this.api
          .addEntity("question", this.form.value)
          .toPromise()
          .catch((error) => {
            throw new Error(error);
          });

        console.log(res);

        if (res.status === "ok") {
          this.utils.dismissLoading();

          // this.api.groupChanges.next("Grupo ha sido creado");
          this.utils.showAlert("¡Listo!", "Tu pregunta ha sido creada");
          this.api.questionChange.next("");
          this.nav.navigateBack("/map");
        } else {
          console.log(res);

          throw new Error(res);
        }
      } catch (error) {
        this.utils.dismissLoading();
        this.utils.showAlert(
          "Algo ha fallado",
          "Por favor, intentalo de nuevo mas tarde"
        );
        console.log(error);
      }
    } else {
      this.utils.showAlert("¡Vaya!", "La fecha y la decada no coinciden");
    }
  }
  //<----------------------METODOS AUTOCOMPLETE---------------------->

  public actualizar(): void {
    // console.log("entra actualizar");

    if (this.search == "") {
      // console.log("search vacia");

      this.autocompleteItems = [];
      this.autocomplete = true;
      return;
    }

    // console.log("DENTRO DE BUSCAR despues del search completo");

    this.googleAutocomplete.getPlacePredictions(
      { input: this.search },
      (predictions, status) => {
        // console.log(status);
        // console.log(predictions);
        this.autocompleteItems = [];
        this.ngZone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      }
    );

    // this.autocompleteItems = [
    //   { description: "Plaza del Callao" },
    //   { description: "Berlin" },
    //   { description: "Madrid" },
    //   { description: "Calle Agua, Sevilla" },
    // ];

    console.log(this.autocompleteItems);
  }

  public selectSearchResult(descripcion): void {
    // console.log("select search result");

    this.search = descripcion;
    // console.log("=>=>=>",this.search);

    //this.form.patchValue({ location: descripcion });
    this.autocompleteItems = [];
    this.autocomplete = false;

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1,
    };
    this.nativeGeocoder
      .forwardGeocode(descripcion)
      .then((result: NativeGeocoderResult[]) => {
        console.log(
          "The coordinates are latitude=" +
            result[0].latitude +
            " and longitude=" +
            result[0].longitude
        );

        this.positionSelected = {
          lat: Number(result[0].latitude),
          lng: Number(result[0].longitude),
        };

        this.form.get("lat").setValue(this.positionSelected.lat);
        this.form.get("lng").setValue(this.positionSelected.lng);

        console.log("FORM IS=>");
        console.log(this.form.value);

        this.map.setCamera({
          coordinate: this.positionSelected,
          zoom: 20,
        });
      })
      .catch((error: any) => console.log(error));
  }

  checkFormValid() {
    this.form.valid
      ? ""
      : this.utils.showAlert(" ¡ Vaya !", "Parece que falta algun dato");

    console.log(this.GetInvalidControls());
  }

  GetInvalidControls() {
    let InvalidControls = "";
    for (const control in this.form.controls) {
      this.form.updateValueAndValidity();
      if (this.form.controls[control].invalid) {
        if (control === "tipo_archivo") {
          let name = "tipo de archivo";
          InvalidControls += "" + name + "\n\n";
        } else if (control === "tema") {
          let name = "Canal";
          InvalidControls += "" + name + "\n\n";
        } else {
          InvalidControls += "" + control + "\n\n";
        }
        console.log(control + " Invalid");
      }
    }
    return InvalidControls;
  }

  async removeImage() {
    if (this.map == undefined) {
      console.log("nomap");
    } else {
      await this.map.destroy();
    }

    this.base64img = undefined;
  }

  back() {
    this.nav.back();
  }
}
