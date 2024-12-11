import { Component, NgZone, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PasoReceta } from "src/app/models/PasoReceta";
import { Ingrediente } from "src/app/models/Ingrediente";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { Camera, CameraOptions } from "@capacitor/camera";
// import {
//   GoogleMaps,
//   GoogleMap,
//   GoogleMapsEvent,
//   Marker,
//   GoogleMapsAnimation,
//   ILatLng,
//   Spherical,
//   GoogleMapsMapTypeId,
//   MyLocation,
//   Environment,
//   GoogleMapOptions,
//   MarkerIcon,
//   MarkerCluster,
//   MarkerClusterIcon,
//   HtmlInfoWindow,
//   Circle,
// } from "@ionic-native/google-maps/ngx";
import {
  NativeGeocoder,
  NativeGeocoderOptions,
  NativeGeocoderResult,
} from "@awesome-cordova-plugins/native-geocoder/ngx";
import { ModalController, NavController } from "@ionic/angular";
import { ModalAjustarImagenPage } from "../modal-ajustar-imagen/modal-ajustar-imagen.page";
import { GoogleMap } from "@capacitor/google-maps";
import { CreateMapArgs } from "@capacitor/google-maps/dist/typings/implementation";
declare let plugins: any;

@Component({
  selector: "app-subir-recetas",
  templateUrl: "./subir-recetas.page.html",
  styleUrls: ["./subir-recetas.page.scss"],
})
export class SubirRecetasPage implements OnInit {
  form: FormGroup;
  public googleAutocomplete: any;
  public map: GoogleMap;
  IsLoading: boolean = true;
  Servings: { id: number; name: string };
  NoServings: boolean = false;
  ingredients: Ingrediente[] = [];
  pasos: PasoReceta[] = [];
  search: any;
  base64img: any;


  autocompleteItems: any[] = [];
  positionSelected: { lat: number; lng: number };
  autocomplete: boolean = false;
  private: boolean = false;

  constructor(
    private ngzone: NgZone,
    private nativeGeocoder: NativeGeocoder,
    private utilities: UtilitiesService,
    private formBuilder: FormBuilder,
    private Api: ApiService,
    private nav: NavController,
    private modalController: ModalController
  ) {
    this.googleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
  }


  async ngOnInit() {
    const    urlPattern = 'https?://.+';
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      archivo: ["", Validators.required],
      time: ["", Validators.required],
      eaters: ["", Validators.required],
      ingredients: [""],
      steps: [""],
      serving: ["", Validators.required],
      private: [this.private, Validators.required],
      notes: ["", Validators.required],
      url: ['', [Validators.required, Validators.pattern(urlPattern)]],
      location: ["", Validators.required],
      lat: ["", Validators.required],
      lng: ["", Validators.required],

      // location: ["", Validators.required],
      // name: ["", Validators.required],time
    });

    await this.innitPage().then(() => {
      this.IsLoading = false;
    });
  }

  /**
   * TODO: Recibe todos los datos necesarios par iniciar la pagina
   *
   * @param Void.
   * @return Void .
   */
  async innitPage() {
    try {
      await this.getServings();
    } catch (error) {}
  }

  /**
   * TODO:  Recibe las categorias de la receta
   *
   * @param Void.
   * @return Void.
   */
  async getServings() {
    try {
      await this.Api.getEntity("serving")
        .toPromise()
        .then((res) => {
          console.log(res);

          if (res.status == "ok") {
            this.Servings = res.data;
            console.log("setted");
          } else {
            if (res.status == "void") {
              this.NoServings = true;
            } else {
              console.log("LINE 74");
              console.log(res);
              throw new Error(res);
            }
          }
        });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }


  /**
   *
   * Comprueba Si el formulario es valido
   * */
  CheckFormValid() {
    let validArrays: boolean = false;

    console.log(this.ingredients.length);
    console.log(this.pasos.length);
    console.log(this.form.valid);

    if (this.ingredients.length > 0 && this.pasos.length > 0) {
      validArrays = true;
    }

    if (this.form.valid && validArrays) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * TODO: Recibe todos los datos y envia los valores a la database
   *
   * @param Void.
   * @return Void .
   */
  async submitForm() {
    if (this.form.invalid) {
      // Si el formulario es inválido, muestra una alerta
      this.utilities.showAlert("Error", "Revisa los campos del formulario, debe ser una url https://");
      return;
    }
    if (this.CheckFormValid()) {
      let params = this.form.value;
      params.steps = this.pasos;
      params.ingredients = this.ingredients;
      params.private = this.private;
      console.log(params);
      let res = await this.Api.addEntity("receta", params).toPromise();
      console.log(res);

      if (res.status == "ok") {
        this.utilities.showToast(res.message);
        this.nav.back();
      } else {
        console.log(res);
        this.utilities.showToast(
          "Parece que ha habido un error, intentalo mas tarde"
        );
        this.nav.back();
      }
    } else {
      let params = this.form.value;
      params.steps = this.pasos;
      params.ingredients = this.ingredients;
      params.private = this.private;
      console.log(params);

      this.utilities.showAlert(
        "Vaya...",
        "parece que faltan algunos campos por rellenar"
      );
    }
  }

  /**
   * Añade el ingrediente seleccionado
   */
  addIngredient() {
    let ingredient = this.form.get("ingredients").value;
    this.form.get("ingredients").setValue("");

    console.log("ingrediente es");

    console.log(ingredient);

    let comprobarLength = ingredient.trim();
    if (comprobarLength == "" || comprobarLength.lenght < 1) {
    } else {
      let position = this.ingredients.length;

      if (position == 0) {
        position = 1;
      }

      this.ingredients.push({ id: position + 1, name: ingredient });

      console.log(this.ingredients);
    }
  }

  /**
   * Añade el paso seleccionado
   */
  addSteps() {
    let steps = this.form.get("steps").value;
    this.form.get("steps").setValue("");

    console.log("steps es");

    console.log(steps);

    let comprobarLength = steps.trim();
    if (comprobarLength == "" || comprobarLength.lenght < 1) {
      return "";
    } else {
      let position = this.pasos.length;
      console.log("POSITION=>", position);

      if (position == 0) {
        position = 1;
      }
      console.log("POSITION=>", position);
      this.pasos.push({ id: position, step: steps });

      console.log(this.pasos);
      return "";
    }
  }

  /**
   * Borra el ingrediente seleccionado
   * @param id
   */
  deleteIngredient(id) {
    this.ingredients = this.ingredients.filter((item) => item.id != id);
  }

  /**
   * Borra el paso seleccionado
   * @param id
   */
  deleteSteps(id) {
    this.pasos = this.pasos.filter((item) => item.id != id);
  }

  SelectChip(c) {
    this.StyleChip(c);
    this.form.get("serving").setValue(c.id);
  }

  SelectPrivacy(c) {
    this.private = c;
    console.log(this.private);
  }

  /**
   * TODO:  Estiliza el chip seleccionado y deselecciona el resto
   *
   * @param id_chip.
   * @return Void.
   */
  StyleChip(c) {
    let id = c.id + "";
    let chips = Array.from(
      document.getElementById("row-chips-101").getElementsByTagName("ion-chip")
    );

    chips.forEach((element) => {
      if (element.classList.contains("custom-chip-marked")) {
        element.classList.remove("custom-chip-marked");
      }
    });

    console.log(chips);

    let selected = chips.find((num) => num.id == id);

    console.log(selected);

    if (typeof selected != undefined) {
      selected.classList.contains("custom-chip-marked")
        ? selected.classList.remove("custom-chip-marked")
        : selected.classList.add("custom-chip-marked");
    }
    console.log(chips);
  }

  /**
   * Elimina la imagen y elimina el mapa
   */
  async removeImage() {
    if (this.map != undefined) {
      await this.map.destroy();
    }
    this.base64img = undefined;
  }




// Metodo crop
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

  //<----------------------METODOS AUTOCOMPLETE---------------------->

  public actualizar(): void {
    // console.log("entra actualizar");

    if (this.base64img == undefined) {
      this.utilities.showAlert(
        "¡Oops!",
        "Por favor, selecciona un archivo a subir"
      );
      (
        document.getElementById("position-input-357") as HTMLInputElement
      ).value = "";
      return;
    }

    this.autocomplete = true;
    if (this.search == "") {
      // console.log("search vacia");

      this.autocompleteItems = [];
      this.autocomplete = false;
      return;
    }

    console.log("DENTRO DE BUSCAR despues del search completo");

    this.googleAutocomplete.getPlacePredictions(
      { input: this.search },
      (predictions, status) => {
        // console.log(status);
        // console.log(predictions);
        this.autocompleteItems = [];
        this.ngzone.run(() => {
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
    //   { description: "Calle Estrella Vega, Sevilla" },
    //   { description: "Calle Candelería, Sevilla" },
    // ];

    console.log(this.autocompleteItems);
  }

  back() {
    this.nav.navigateBack("tabs/home");
  }

  public selectSearchResult(descripcion): void {
    // console.log("select search result");
    this.autocompleteItems = [];
    this.autocomplete = false;

    this.search = descripcion;
    // console.log("=>=>=>",this.search);
    // this.form.get("direccion").setValue(this.search);
    this.form.patchValue({ location: descripcion });

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

  // Adjuntar Imagen

  public adjuntarImagen(): void {
    // TODO Implement new camera.
    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    //   targetWidth: 1920,
    //   targetHeight: 1080,
    //   allowEdit: false,
    //   correctOrientation: true,
    // };
    // this.ngzone.run(() => {
    //   this.camera
    //     .getPicture(options)
    //     .then(async (urlFoto) => {
    //       this.base64img = "data:image/jpeg;base64," + urlFoto;
    //       this.form.patchValue({ archivo: this.base64img });

    //       console.log(urlFoto);

    //       await this.loadMap();
    //     })
    //     .catch((error) => {
    //       this.utilities.showAlert("Error al obtener imagen", error);
    //     });
    // });
  }

  // CARGAR MAPA

  public async loadMap() {
    // Environment.setEnv({
    //   API_KEY_FOR_BROWSER_DEBUG: "AIzaSyDmfNZjzV2rN3hJZuMihXZIiB3Hjkw0LtE",
    //   API_KEY_FOR_BROWSER_RELEASE: "AIzaSyDmfNZjzV2rN3hJZuMihXZIiB3Hjkw0LtE",
    // });
    // Environment.setBackgroundColor("white");
    let mapOptions: CreateMapArgs = {
      id: "",
      apiKey: '',
      element: document.getElementById("map-div-1010"),
      config: {
        center: {
          lat: 39.416775,
          lng: -3.703,
        },
        zoom: 15,

      },
    };

    this.map = await GoogleMap.create(mapOptions, (mapready: any)=>{
    //  for(let offer of this.offers){
    //     this.getCoordsFromAddress(offer);
    //     console.log(offer.location);

    //   }
    });
  }

    // this.map.getMyLocation().then((res) => {
    //   this.map.moveCamera({
    //     target: res.latLng,
    //   });
    // });
}
