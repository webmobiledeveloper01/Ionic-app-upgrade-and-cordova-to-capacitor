import { Component, NgZone, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { IonButton, ModalController, NavController } from "@ionic/angular";
// import * as moment from "moment";
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
import { TranslateService } from "@ngx-translate/core";
import { GoogleMap } from "@capacitor/google-maps";

// import {
//   Environment,
//   GoogleMap,
//   GoogleMapOptions,
//   GoogleMaps,
//   GoogleMapsEvent,
// } from "@ionic-native/google-maps";
declare var plugins, google;
@Component({
  selector: "app-edit-question",
  templateUrl: "./edit-question.page.html",
  styleUrls: ["./edit-question.page.scss"],
standalone: false,
})
export class EditQuestionPage implements OnInit {
  form: any;
  question: any;
  categories: any;
  isLoading: boolean;
  public googleAutocomplete: any;
  public autocompleteItems: any[];
  public autocomplete: boolean = true;
  public search: string = "";
  map: GoogleMap;
  positionSelected: any;
  base64img=null;
  ThereIsMap: boolean = false;
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
  constructor(
    private api: ApiService,
    private utils: UtilitiesService,
    private fb: FormBuilder,
    private nav: NavController,private ngZone: NgZone,
    private nativeGeocoder: NativeGeocoder,
    private modalController: ModalController,
    private translateService: TranslateService
  ) {
    this.googleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
  }

  async ngOnInit() {
    this.SetQuestion();
    this.form = this.fb.group({
      question: [this.question.question],
      category_id: [""],
      date: [""],
      decada: [""],
      archivo: [""],
      //  Validators.required
      ubicacion: [""],
      visibility: [""],
    });

    await this.getCategories().then(async () => {
      this.isLoading = false;
    });
  }

  Back() {
    this.nav.back();
  }
  public async loadMap() {
    try {
      const mapElement = document.getElementById('map-div') as HTMLElement;


      this.map = await GoogleMap.create({
        id: 'map-div',
        element: mapElement,
        apiKey: 'AIzaSyCFicGw2uNlwVz0huYvSXyuU0JnQlpaG_Y',
        config: {
          center: { lat: 37.789441, lng: -122.419397 },
          zoom: 12,
          // tilt: 30,
        },
      });

      console.log('Map created successfully!', this.map);


      await this.map.enableCurrentLocation(true);


      // await this.map;
      // let currentPosition = this.map.location
      // console.log('Current Position:', currentPosition);


      // await this.map.setCamera({
      //   coordinate: {
      //     lat: currentPosition.latitude,
      //     lng: currentPosition.longitude,
      //   },
      //   zoom: 15,
      // });

      console.log('Camera moved to user location.');
    } catch (error) {
      console.error('Error initializing map:', error);
      this.utils.showAlert(
        this.translateService.instant('Ubicación desactivada'),
        this.translateService.instant(
          'Sin acceso a la ubicación, la publicación no se subirá correctamente'
        )
      );
    }
  }
  // public async loadMap() {
  //   Environment.setEnv({
  //     API_KEY_FOR_BROWSER_DEBUG: "AIzaSyDnVEq799iMJ1j0FjyVA2CB5yriBuPHKdE",
  //     API_KEY_FOR_BROWSER_RELEASE: "AIzaSyDnVEq799iMJ1j0FjyVA2CB5yriBuPHKdE",
  //   });
  //   Environment.setBackgroundColor("white");

  //   //  let myPosition= await GoogleMap.getMyLocation();

  //   let mapOptions: GoogleMapOptions = {
  //     camera: {
  //       target: {
  //         // lat: 40.712784,
  //         // lng: -74.005941

  //         lat: 37.789441,
  //         lng: -122.419397,
  //       },
  //       zoom: 12,
  //       tilt: 30,
  //     },
  //   };

  //   this.map = GoogleMaps.create("map-div", mapOptions);

  //   this.map.getMyLocation().then((res) => {
  //     this.map.moveCamera({
  //       target: res.latLng,
  //     });
  //   });

  //   console.log(this.map);

  //   this.map
  //     .one(GoogleMapsEvent.MAP_READY)
  //     .then(() => {
  //       this.map
  //         .getMyLocation()
  //         .then((response) => {
  //           console.log("Respuesta Localizacion Camara", response);

  //           this.map.moveCamera({
  //             target: response.latLng,
  //           });
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.log(error);

  //       this.utils.showAlert(
  //         this.translateService.instant("Ubicacion desactivada"),
  //         this.translateService.instant("Sin acceso a la ubicacion la publicacion no se subira correctamente")
  //       );
  //     });
  // }

  MapSwitch(option) {
    switch (option) {
      case 1:
        // CAMBIAR UBICACION

        let btn: any = document.getElementById(
          "subidaBTN"
        ) as unknown as IonButton;

        btn.style.display = "none";

        let mapRow = document.getElementById("map-row-vis");

        mapRow.style.display = "block";
        setTimeout(() => {
          this.loadMap();
        }, 500);
        this.ThereIsMap = true;
        break;

      case 2:
        this.ThereIsMap = false;
        let butn: any = document.getElementById(
          "subidaBTN"
        ) as unknown as IonButton;

        butn.style.display = "block";

        setTimeout(() => {
          this.UnloadMap();
        }, 500);

        break;
    }
  }
  async UnloadMap() {
    await this.map.destroy();
    let mpRow = document.getElementById("map-row-vis");

    mpRow.style.display = "none";
  }

  // TODO Camera Capacitor Implementation below
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
  //     this.camera
  //       .getPicture(options)
  //       .then((urlFoto) => {
  //         this.base64img = "data:image/jpeg;base64," + urlFoto;
  //         this.form.patchValue({ archivo: this.base64img });

  //         console.log(urlFoto);
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
      } else {
        this.utils.showAlert(this.translateService.instant("Error al obtener imagen"), this.translateService.instant("No se pudo obtener la imagen"));
      }
    } catch (error) {
      console.error(error);
      this.utils.showAlert(this.translateService.instant("Error al obtener imagen"), error.message);
    }
  }


  deleteImage(){
    this.base64img=null;
    this.form.patchValue({ archivo: "" });

  }
  async openCropImageModal() {

    const modal = await this.modalController.create({
      component: ModalAjustarImagenPage,
      componentProps: {
        base64img: this.base64img,
        mode: "UPLOAD",
      },
    });
    modal.present();
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (typeof data != "undefined") {
        if (data.data.hasImage) {
          this.base64img = data.data.image;
          this.form.patchValue({ archivo: this.base64img });
        }
      }

      console.log("Se cierra la modal");
    });
  }

  SetQuestion() {
    this.question = history.state.getQuestion;
    console.log("QUESTION =>");

    console.log(this.question);
  }

  SetVisibilityValue($event) {
    this.selectControl($event.target, 1);

    console.log("EVENT IS=>");

    console.log($event.target.id);

    this.form.get("visibility").setValue($event.target.id);
  }

  cambiarDecada($event) {
    console.log($event);

    this.form.get("decada").patchValue($event.target.value);
  }
  // selectSearchResult(){}
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

  async getCategories() {
    try {
      let res = await this.api.getEntity("ChanelsCategories").toPromise();

      console.log("RESPONSE =>");

      console.log(res);

      if (res.status === "ok") {
        res.data = this.categories = res.data;
      } else {
        throw new Error(res);
      }
    } catch (error) {
      this.utils.showAlert(this.translateService.instant("¡Vaya!"), this.translateService.instant("Ha ocurrido un error en el servidor"));

      console.log(error);
    }
  }
  SetCategoryValue($event) {
    this.selectControl($event.target, 0);

    console.log("EVENT IS=>");

    console.log($event.target.id);

    this.form.get("category_id").setValue($event.target.id);
  }

  async deleteQuestion() {
    this.utils.showLoading(this.translateService.instant("Eliminando pregunta..."));
    try {
      let res = await this.api
        .deleteEntity("question", this.question.id)
        .toPromise();

      this.utils.dismissLoading();

      console.log("response=>");

      console.log(res);

      this.api.questionChange.next("");

      this.utils.showToast(this.translateService.instant("Pregunta borrada correctamente"));
      window.history.back();
    } catch (error) {
      this.utils.dismissLoading();

      console.log("response=>");

      console.log(error);
    }
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
      // console.log(CheckString);
      // console.log(decadaString);
      // console.log("SUBS");
      // console.log(CheckString.substring(0, 3));
      // console.log(decadaString.substring(0, 3));
      if (CheckString.substring(0, 3) === decadaString.substring(0, 3)) {
        IsCorrect = true;
        // console.log("TRUE");
        return true;
      } else {
        return false;
      }
    }
  }
  async submitQuestion() {
    // let date = this.form.get("date").value.split("T")[0];
    // this.form.get("date").setValue(date);
    if (this.setFechaValueIfVoid()) {
      await this.utils.showLoading(this.translateService.instant("Editando pregunta..."));
      try {
        this.search == ""
          ? console.log("Not void")
          : this.form.get("ubicacion").setValue(this.search);
        let res = await this.api
          .updateEntity("question", this.question.id, this.form.value)
          .toPromise();

        this.utils.dismissLoading();

        console.log("response=>");

        console.log(res);

        this.api.questionChange.next("");
        this.utils.showToast(this.translateService.instant("Pregunta editada correctamente"));

        window.history.back();
      } catch (error) {
        this.utils.dismissLoading();

        console.log("response=>");

        console.log(error);
      }
    } else {
      this.utils.showAlert(this.translateService.instant("¡Vaya!"),
      this.translateService.instant("La fecha y la decada no coinciden"));
    }
  }

  //AUTOCOMPLETE

  // AUTOCOMPLETE

  public actualizar(): void {
    // console.log("entra actualizar");

    if (this.search == "") {
      // console.log("search vacia");

      this.autocompleteItems = [];
      this.autocomplete = true;
      return;
    }

    console.log("DENTRO DE BUSCAR despues del search completo");

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
    //   { description: "Las Ramblas, Barcelona" },
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
}
