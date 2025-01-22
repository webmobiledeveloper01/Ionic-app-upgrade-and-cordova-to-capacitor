import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Camera, CameraOptions, CameraResultType, CameraSource } from "@capacitor/camera";
import {
  FileTransfer,
  FileTransferObject,
  FileUploadOptions,
} from "@awesome-cordova-plugins/file-transfer/ngx";
// import { DomSanitizer } from "@angular/platform-browser";
import { File } from "@awesome-cordova-plugins/file/ngx";
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
// BK:NotInUse Not in use.
// import { Crop } from "@ionic-native/crop/ngx";
import {
  NativeGeocoder,
  NativeGeocoderOptions,
  NativeGeocoderResult,
} from "@awesome-cordova-plugins/native-geocoder/ngx";
// import { FileChooser } from "@ionic-native/file-chooser/ngx";
// import { Filesystem, Directory } from '@capacitor/filesystem';

import {
  IonCheckbox,
  ModalController,
  NavController,
  Platform,
} from "@ionic/angular";
import { Storage } from "@ionic/storage-angular";
import { Tema } from "src/app/models/Temas";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { environment } from "src/environments/environment";
import { ModalAjustarImagenPage } from "../modal-ajustar-imagen/modal-ajustar-imagen.page";
import { FilePicker, PickFilesOptions} from '@capawesome/capacitor-file-picker';
import { GoogleMap, MapType } from "@capacitor/google-maps";
import { CreateMapArgs } from "@capacitor/google-maps/dist/typings/implementation";

declare let plugins: any;

@Component({
  selector: "app-subir-contenido",
  templateUrl: "./subir-contenido.page.html",
  styleUrls: ["./subir-contenido.page.scss"],
standalone: false,
})
export class SubirContenidoPage implements OnInit {
  @ViewChild("Mapcheckbox", { static: false }) Mapcheckbox: IonCheckbox;
  @ViewChild("Datecheckbox", { static: false }) Datecheckbox: IonCheckbox;
  // @ViewChild("canvasEl",{static:false}) canvasElement: HTMLCanvasElement;
  categories: any;
  public googleAutocomplete: any;
  public autocompleteItems: any[];
  public autocomplete: boolean = true;
  public search: string = "";
  positionSelected: any;
  form: FormGroup;
  MapIsVisible: boolean = false;
  base64img: any;
  direccion: any;
  public map: GoogleMap;
  public temas: Tema;
  DateIsCorrect: boolean = false;
  DontUsePreciseDate: boolean = false;
  correctFile: boolean = true;

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
  // BK:UsingCapacitorPlugin Convert cordova camera options to Capacitor.
  // CameraImageOptions: CameraOptions = {
  //   quality: 100,
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   mediaType: this.camera.MediaType.PICTURE,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  // };

  // CameraVideoOptions: CameraOptions = {
  //   quality: 100,
  //   destinationType: this.camera.DestinationType.FILE_URI,
  //   mediaType: this.camera.MediaType.VIDEO,
  //   // encodingType: this.camera.EncodingType.JPEG,
  //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //   targetWidth: 1920,
  //   targetHeight: 1080,
  //   allowEdit: true,
  //   correctOrientation: true,
  // };
  // UsingCapacitorPlugin Verifiy options from Capacitor.
  CameraImageOptions: CameraOptions = {
    quality: 100,
    resultType: CameraResultType.DataUrl, // Use DataUrl for data URI
    source: CameraSource.Photos, // Use Photos for PhotoLibrary
  };

  CameraVideoOptions: CameraOptions = {
    quality: 100,
    resultType: CameraResultType.Uri, // Use Uri for file URI
    source: CameraSource.Photos, // Use Photos for PhotoLibrary
    width: 1920,
    height: 1080,
    allowEditing: true,
    correctOrientation: true,
  };

  SelectedFileType = {
    isImage: false,
    isVideo: false,
    isAudio: false,
  };
  token: any;
  canvas: any;
  context: any;
  ScreenWidth: any;
  ScreenHeight: any;
  base64asImg: any;
  originalImageHeight: any;
  originalImageWidth: any;

  constructor(
    private formBuilder: FormBuilder,
    // ,
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private nativeGeocoder: NativeGeocoder,
    private navCtrl: NavController,
    private ngzone: NgZone,
    private storage: Storage,
    private transfer: FileTransfer,
    // UsingCapacitorPlugin Implement File System from capacitor
    // private fileChooser: FileChooser,
    private platform: Platform,
    private modcontrol: ModalController,
    // private crop: Crop,
    private file: File
  ) {
    this.googleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
    this.platform.is("android")
      ? this.CameraImageOptions.allowEditing == false
      : this.CameraImageOptions.allowEditing;
  }

  async ngOnInit() {
    this.storage.get("auth-token").then((token) => {
      this.token = token;
      console.log("Token", this.token);
    });

    await this.getCategories();

    this.form = this.formBuilder.group({
      visibilidad: ["", Validators.required],
      direccion: ["", Validators.required],
      tipo_archivo: ["", Validators.required],
      archivo: ["", Validators.required],
      titulo: ["", Validators.required],
      descripcion: ["", Validators.required],
      tema: ["", Validators.required],
      lat: ["", Validators.required],
      longitud: ["", Validators.required],
      fecha: ["", Validators.required],
      decada: ["", Validators.required],
    });
  }

  async ionViewDidEnter() {
    console.log(this.Datecheckbox);
    console.log(this.Mapcheckbox);

    // try {
    //   console.log("SE LLAMA AL MAPA ");
    // } catch (error) {
    //   console.log(error);
    //   this.utilities.showAlert(
    //     "Ubicacion desactivada",
    //     "Sin acceso a la ubicacion la publicacion no se subira correctamente"
    //   );
    // }
  }

  SetVisibilityValue($event) {
    // this.selectControl($event.target, 1);

    console.log("EVENT IS=>");

    console.log($event.target.id);

    this.form.get("visibilidad").setValue($event.target.id);
  }

  public traerTemas() {
    this.apiService.getEntity("temas").subscribe((temas: Tema) => {
      this.temas = temas;
    });
  }

  async openCropImageModal() {
    const modal = await this.modcontrol.create({
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

  public async loadMap() {
    // Environment.setEnv({
    //   API_KEY_FOR_BROWSER_DEBUG: "AIzaSyDmfNZjzV2rN3hJZuMihXZIiB3Hjkw0LtE",
    //   API_KEY_FOR_BROWSER_RELEASE: "AIzaSyDmfNZjzV2rN3hJZuMihXZIiB3Hjkw0LtE",
    // });

    let mapOptions: CreateMapArgs = {
      id: 'createMap1',
      apiKey: 'AIzaSyDmfNZjzV2rN3hJZuMihXZIiB3Hjkw0LtE',
      element: document.getElementById('map_canvas'),
      config:{
        // mapTypeId: MapType.Satellite,
          center: {
            lat: 36.67929,
            lng: -6.1241,
          },
          zoom: 15,
          // tilt: 30,
        },
      }

    setTimeout(async () => {
    await GoogleMap.create(mapOptions, ()=>{

      }).then(() => {
        // this.map.setMapTypeId("MAP_TYPE_SATELLITE");
        // this.map.setMyLocationEnabled(true);
        // this.map.setMyLocationButtonEnabled(true);
      })
      .catch((error) => {
        console.log(error);

        // this.utilities.showAlert(
        //   "Ubicacion desactivada",
        //   "Sin acceso a la ubicacion la publicacion no se subira correctamente"
        // );
      });;

    //   this.map.getMyLocation().then((res) => {
    //     this.map.moveCamera({
    //       target: res.latLng,
    //     });
    //   });

    //   this.map
    //     .one(GoogleMapsEvent.MAP_READY)

    // }, 1000);
  })
}

  async removeImage() {
    console.log("Entra en el borrar");

    if (this.map != undefined) {
      await this.map.destroy();
    }
    this.base64img = null;
    this.form.get("archivo").setValue(null);
    this.Mapcheckbox.checked = false;
    this.MapIsVisible = false;
    console.log(this.form.value);
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

  // UsingCapacitorPlugin:FilePicker Updated to Capacitor
  // public GetMp3() {
  //   console.log("Entra donde debe");

  //   let options = { mime: "audio/*" };
  //   this.fileChooser
  //     .open(options)
  //     .then((uri) => {
  //       // console.log(file);
  //       console.log(uri);
  //       this.base64img = uri;
  //       this.form.patchValue({ archivo: this.base64img });
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }

  public async GetMp3() {
  console.log("Entra donde debe");

  try {
    const options: PickFilesOptions = {
      "types": ['audio/*'],
      limit: 1
    };

    const result = await FilePicker.pickFiles(options);

    if (result.files.length > 0) {
      console.log(result.files[0].path);
      this.base64img = result.files[0].data;
      this.form.patchValue({ archivo: this.base64img });
    } else {
      console.log('No file selected');
    }
  } catch (e) {
    console.error(e);
  }
}

  public selectSearchResult(descripcion): void {
    // console.log("select search result");

    this.search = descripcion;
    this.form.patchValue({ direccion: descripcion });

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
        this.form.get("longitud").setValue(this.positionSelected.lng);

        console.log("FORM IS=>");
        console.log(this.form.value);

        this.map.setCamera({
          coordinate: this.positionSelected,
          zoom: 20,
        });
      })
      .catch((error: any) => console.log(error));
  }

  public async submitForm(): Promise<void> {
    await this.CheckIfFormIsValid().then(async (validform) => {
      console.log("LLEGA AL SUMBIT=>");

      console.log(validform);

      if (validform && this.DateIsCorrect) {
        // await this.SetArchivoValue();

        console.log("Se subira la publicacion");
        await this.utilities.showLoading("Subiendo publicacion...");

        this.apiService.addEntity("publicaciones", this.form.value).subscribe(
          () => {
            this.apiService.postChanges.next(true);
            this.utilities.dismissLoading();
            this.navCtrl.navigateForward("tabs/home");
            this.utilities.showToast("Se ha subido su publicación");
          },
          (error) => {
            // this.utilities.showToast(codeErrors(error));
            this.utilities.dismissLoading();
            this.utilities.showToast(
              "Ha ocurrido un error al insertar la Publicación"
            );
          }
        );
      } else {
        if (this.correctFile) {
          console.log("No se subira la publicacion");
          let invalidforms = this.GetInvalidControls();
          this.utilities.showAlert(
            "Los siguentes campos estan incompletos",
            invalidforms
          );
        }
      }
    });

    // await this.utilities.showLoading("Creando Publicación...");
    /////////////////  down IS NEW////////////////////////

    /////////////////  UP IS NEW////////////////////////
    // let options: NativeGeocoderOptions = {
    //   useLocale: true,
    //   maxResults: 1,
    // };
    // this.nativeGeocoder.forwardGeocode(this.form.value.direccion, options).then(
    //   (result: NativeGeocoderResult[]) => {
    //     this.form.value.lat = result[0].latitude;
    //     this.form.value.longitud = result[0].longitude;
    //     this.utilities.showLoading("Insertando Publicación...");
    //     this.apiService.addEntity("publicaciones", this.form.value).subscribe(
    //       () => {
    //         this.utilities.dismissLoading();
    //         this.utilities.showToast("Subida Publicación");
    //       },
    //       (error) => {
    //         this.utilities.showToast(codeErrors(error));
    //       }
    //     );
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.utilities.dismissLoading();
    //     this.utilities.showToast(
    //       "Ha ocurrido un error al insertar la Publicación"
    //     );
    //   }
    // );
  }
  async SetArchivoValue() {
    if (this.SelectedFileType.isVideo) {
      let result: boolean;
      await this.uploadVideo()
        .then(() => {
          result = true;
        })
        .catch(() => {
          result = false;
        });

      return result;
    } else if (this.SelectedFileType.isAudio) {
      let result: boolean = false;
      await this.uploadAudio()
        .then((res) => {
          console.log(res);
          this.correctFile = true;
          result = res;
        })
        .catch((error) => {
          this.utilities.showAlert("", error);
          this.correctFile = false;
          result = false;
        });

      return result;
    } else if (this.SelectedFileType.isImage) {
      console.log("QUE HAY EN BASE64");
      console.log(this.base64img);
      this.form.patchValue({ archivo: this.base64img });
      console.log("Is image, returnig true");
      return true;
    }
    else{
      return false;
    }

    // this.SelectedFileType.isDocument;
  }

  /**
   * Checks if form is valid and return true or false
   * @returns Valid:boolean
   */
  async CheckIfFormIsValid(): Promise<boolean> {
    this.setMapValidators();
    this.setFechaValueIfVoid();
    let validForm = this.form.valid;
    console.log("IS VALID?");
    console.log(validForm);
    console.log("VALUES=>");
    console.log(this.form.value);
    if (validForm && this.DateIsCorrect) {
      let result: boolean;
      await this.SetArchivoValue().then((success) => {
        console.log("success?");
        console.log(success);
        result = success;
      });
      return result;
    } else {
      return validForm;
    }
  }

  /**
   * Checks if fecha control is void and fills it with decade value
   *
   * @returns Valid:boolean
   */
  setFechaValueIfVoid() {
    let fech = this.form.get("fecha").value;
    console.log("fecha value es =>", fech);

    if (!this.DontUsePreciseDate) {
      this.CheckDate();
      if (this.DateIsCorrect) {
        console.log("LA FECHA ES CORRECTA");
      }
      console.log("fecha no estaba vacio");
      let date: string = this.form.get("fecha").value;
      date = date.split("T")[0];
      this.form.get("fecha").setValue(date);
      console.log("setteada fecha");
      console.log(this.form.get("fecha").value);
    } else {
      console.log("fecha estaba vacio");
      let decada = this.form.get("decada").value;
      this.form.get("fecha").setValue(decada);
      // this.CheckDate();
      this.DateIsCorrect = true;
      if (this.DateIsCorrect) {
        console.log("LA FECHA ES CORRECTA");
      }
    }
  }

  CheckDate() {
    let date: string = this.form.get("fecha").value;

    // if (date.indexOf("T")!==-1) {
    // }
    date = date.split("T")[0];

    let year = new Date(date);
    let Checkyear = year.getFullYear();
    let decada = this.form.get("decada").value;
    let IsCorrect: boolean = false;
    if (decada !== null) {
      let CheckString = "" + Checkyear;
      let decadaString = decada.toString();
      if (CheckString.substring(0, 3) === decadaString.substring(0, 3)) {
        IsCorrect = true;
        // console.log("TRUE");
      }
      this.DateIsCorrect = IsCorrect;
    } else {
      this.DateIsCorrect = false;
    }
  }

  /**
   * Checks if map is visible and controls should be required
   *
   * @returns Valid:boolean
   */

  async setMapValidators() {
    if (this.MapIsVisible) {
      console.log("MAPA ES VISIBLE , SE REQUIEREN LOS CONTROLES");
      this.addValidators();
    } else {
      this.deleteValidators();
    }
  }

  async getCategories() {
    try {
      let res = await this.apiService
        .getEntity("ChanelsCategories")
        .toPromise()
        .catch((err) => {
          throw new Error(err);
        });

      console.log("RESPONSE =>");

      console.log(res);

      if (res.status === "ok") {
        this.categories = res.data;
      } else {
        throw new Error(res);
      }
    } catch (error) {
      this.utilities.showAlert("¡Vaya!", "Ha ocurrido un error en el servidor");

      console.log(error);
    }
  }
  /**
   *
   *
   */
  addValidators() {
    let controls = ["direccion", "lat", "longitud"];

    controls.forEach((element) => {
      let control = this.form.get(element);
      // console.log("Elcontrol", control);

      control.clearValidators();
      control.setValidators([Validators.required]);
      control.updateValueAndValidity({
        onlySelf: true,
      });
    });
  }

  /**
   * deletes the controls validators from map
   */
  deleteValidators() {
    let controls = ["direccion", "lat", "longitud"];

    controls.forEach((element) => {
      let control = this.form.get(element);
      // console.log("Elcontrol", control);

      control.clearValidators();
      control.updateValueAndValidity({
        onlySelf: true,
      });
    });
  }

  /** Handle the click on the map checkbox
   *
   * @param $event
   */
  public async HandleMapVisibility($event) {
    let isChecked: boolean = $event.target.checked;
    // console.log();

    if (isChecked) {
      let imageExist = this.base64img != null || this.base64img != undefined;
      if (imageExist) {
        this.MapIsVisible = true;
        await this.loadMap()
          .then((res) => {
            // Environment.setBackgroundColor("#FAF5F0");
            console.log(res);
            console.log("Mapa cargado correctamente");
          })
          .catch(async (err) => {
            console.log("Error al cargar el mapa");
            this.utilities.showAlert(
              "No ha sido posible encontrar tu ubicación",
              "Comprueba la locaclizacion y tu conexión"
            );
          });
      } else {
        $event.target.checked = false;

        this.utilities.showAlert(
          "¡Oops!",
          "Por favor, selecciona un archivo a subir"
        );
        return;
      }
    } else {
      if (this.map != undefined) {
        await this.map.destroy();
      }
      this.MapIsVisible = false;
      this.resetMapControlsValues();
    }
  }
  resetMapControlsValues() {
    let controls = ["direccion", "lat", "longitud"];

    controls.forEach((element) => {
      let control = this.form.get(element);
      // console.log("Elcontrol", control);

      control.setValue("");
    });
  }

  /** Handle the click on the map checkbox
   *
   * @param $event
   */
  public async HandleDateUsage($event) {
    let isChecked: boolean = $event.target.checked;
    // console.log();
    this.form.get("fecha").setValue(null);
    this.DontUsePreciseDate = isChecked;
  }

  selectControl(SelectedChip) {
    let chips;
    let options = 1;
    switch (options) {
      case 0:
        chips = document
          .getElementById("category-wrap")
          .getElementsByTagName("ion-chip");
        break;
      case 1:
        chips = document
          .getElementById("temas-wrap-357")
          .getElementsByTagName("ion-button");
        break;
    }

    // console.log("Chips are=>");
    // console.log(chips);

    for (let index = 0; index < chips.length; index++) {
      let chip = chips[index];
      if (chip.classList.contains("custom")) {
        chip.classList.remove("custom");
      }
    }
    SelectedChip.classList.toggle("custom");
  }

  cambiarVerPublicacion(event) {
    this.form.patchValue({
      visibilidad: event.detail.value,
    });
  }

  cambiarTipoArchivo(event) {
    this.form.patchValue({
      tipo_archivo: event.detail.value,
    });

    this.setUploadType(event);
  }

  setUploadType(event) {
    this.resetSelectedFileValues();
    console.log("LLega=>");
    console.log(event.detail.value);

    let valueOfFileType: number = Number(event.detail.value);

    switch (valueOfFileType) {
      case 1:
        this.SelectedFileType.isImage = true;
        this.SelectedFileType.isVideo = false;
        console.log(this.SelectedFileType);
        break;
      case 2:
        this.SelectedFileType.isVideo = true;
        this.SelectedFileType.isImage = false;

        console.log(this.SelectedFileType);

        break;
      case 3:
        this.SelectedFileType.isAudio = true;
        console.log(this.SelectedFileType);

        break;
    }
  }

  resetSelectedFileValues() {
    this.base64img = undefined;
    for (var i in this.SelectedFileType) {
      if (this.SelectedFileType[i] === true) {
        this.SelectedFileType[i] = false;
      }
    }
  }

  cambiarDecada(event) {
    this.form.patchValue({
      decada: event.detail.value,
    });
  }

  cambiarTema(tema_id, $event) {
    this.form.patchValue({
      tema: tema_id,
    });

    this.selectControl($event.target);
  }

  public adjuntarImagen(): void {
    let options = this.CameraImageOptions;
    this.ngzone.run(() => {
      // TODO
      Camera
        .getPhoto(options)
        .then(async (urlFoto) => {
          this.base64img = urlFoto.dataUrl;
          // this.base64img = base64;
          this.form.patchValue({ archivo: this.base64img });

            // await this.crop.crop(urlFoto, { quality: 100 }).then((path) => {
            //   console.warn("Cropped Image Path=>: " + path);
            //   this.showCroppedImage(path.split('?')[0]);
            // });
        })

        .catch((error) => {
          console.error("ERROR =>=> {", error);

          this.utilities.showAlert("Error al obtener imagen", error);
        });
    });
  }

  showCroppedImage(ImagePath) {
    var copyPath = ImagePath;
    var splitPath = copyPath.split("/");
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then(
      (base64) => {
        this.base64img = base64;
        this.form.patchValue({ archivo: this.base64img });
      },
      (error) => {
        alert("Error in showing image" + error);
      }
    );
  }

  // async convertToBase64(imagePath: string) {
  //   try {
  //     const base64Data = await this.file.readAsDataURL(imagePath, "");
  //     this.base64img = base64Data;

  //   } catch (error) {
  //     console.error("Error converting to base64:", error);
  //   }
  // }

  getVideo() {
    let options = this.CameraVideoOptions;
    Camera.getPhoto(options).then(async (file) => {
      console.log(file);
      this.base64img = file.dataUrl;
      this.form.patchValue({ archivo: this.base64img });
    });
  }

  async uploadVideo() {
    let file = this.base64img;
    let extension = this.utilities.getFileExtension(file);
    this.token;
    let accepts = "video/" + extension;

    await this.utilities.showLoading("Subiendo vídeo...");
    setTimeout(() => {
      this.utilities.dismissLoading();
      this.utilities.showLoading(
        "Esto puede tardar dependiendo del tamaño del vídeo."
      );
    }, 1000);
    // console.log("token before upload", this.token);

    const fileTransfer: FileTransferObject = this.transfer.create();
    const options: FileUploadOptions = {
      fileKey: "file",
      fileName: file,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { extension: extension },
      httpMethod: "POST",
      headers: {
        Accept: accepts,
        // "video/*",
        Authorization: "Bearer " + this.token,
      },
    };
    await fileTransfer
      .upload(file, environment.apiUrl + "video", options)
      .then((data: any) => {
        console.table(data);
        if (data.bytesSent > 55100000) {
          this.utilities.dismissLoading();
          this.utilities.showToast(
            "El tamaño del vídeo no puede ser superior a 55 MB. El vídeo no ha sido subido."
          );
          this.form.patchValue({ archivo: "" });
          return false;
        } else {
          console.log(data.response);
          let res = JSON.parse(data.response);
          console.log("JOTASON");
          console.log(res);

          this.form.patchValue({ archivo: res.url });
          this.utilities.dismissLoading();
          this.utilities.showToast("Vídeo subido correctamente.");
          console.log(this.form.value);
          return true;
        }
      })
      .catch((err) => {
        this.form.patchValue({ archivo: "" });
        console.log(err);
        this.utilities.dismissLoading();
        this.utilities.showToast("Error subiendo el vídeo.");
        return false;
      });
  }

  async uploadAudio(): Promise<boolean> {
    let file = this.base64img;
    let succes: boolean = false;
    this.token;
    await this.utilities.showLoading("Subiendo audio...");
    // this.utilities.showLoading(
    //   "Esto puede tardar dependiendo del tamaño del audio."
    // );

    // console.log("token before upload", this.token);

    const fileTransfer: FileTransferObject = this.transfer.create();
    const options: FileUploadOptions = {
      fileKey: "file",
      fileName: file,
      chunkedMode: false,
      mimeType: "audio/*",
      httpMethod: "POST",
      headers: {
        Accept: "audio/*",
        Authorization: "Bearer " + this.token,
      },
    };
    await fileTransfer.upload(file, environment.apiUrl + "audio", options).then(
      (data: any) => {
        this.utilities.dismissLoading();

        console.table(data);
        if (data.bytesSent > 55100000) {
          this.utilities.dismissLoading();
          this.utilities.showToast(
            "El tamaño del audio no puede ser superior a 55 MB. El audio no ha sido subido."
          );
          this.form.patchValue({ archivo: "" });
          succes = false;
        } else {
          console.log(data.response);
          let res = JSON.parse(data.response);
          console.log("JOTASON");
          console.log(res);

          this.form.patchValue({ archivo: res.url });
          this.utilities.dismissLoading();
          this.utilities.showToast("Audio subido correctamente.");
          console.log(this.form.value);
          succes = true;
        }
      },
      (err) => {
        this.utilities.dismissLoading();
        this.form.patchValue({ archivo: "" });
        this.base64img = null;
        console.log(err);
        this.utilities.dismissLoading();
        let msg = JSON.parse(err.body);
        console.log(msg);
        // this.utilities.showToast(msg.message);
        throw new Error(msg.message);

        succes = false;
      }
    );
    return succes;
  }

  // returnCameraOptions(): CameraOptions {
  //   if (this.SelectedFileType.isImage) {
  //     return this.CameraImageOptions;
  //   } else {
  //     return this.CameraVideoOptions;
  //   }
  // }

  public back(): void {
    this.navCtrl.back();
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

    if (!this.DateIsCorrect) {
      InvalidControls += "Las fechas no coinciden";
    }
    return InvalidControls;
  }

  debugForm() {
    console.log("formvalue:");
    console.log(this.form.value);
    console.log("Archive:");
    console.log(this.SelectedFileType);
    this.utilities.showAlert(
      "¡Oops",
      "Esto es un alert de prueba con un mensaje muy largo muy largo  muy largo  muy largo  muy largo  muy largo  muy largo  muy largo  muy largo  muy largo  muy largo  muy largo "
    );
  }
}
