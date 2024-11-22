import {
  ApplicationRef,
  Component,
  NgZone,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  AlertController,
  ModalController,
  NavController,
} from "@ionic/angular";
import { MapState } from "src/app/models/MapState";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { Camera, CameraOptions, CameraResultType, CameraSource } from "@capacitor/camera";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  ILatLng,
  Spherical,
  GoogleMapsMapTypeId,
  MyLocation,
  Environment,
  GoogleMapOptions,
  MarkerIcon,
  MarkerCluster,
  MarkerClusterIcon,
  HtmlInfoWindow,
  Circle,
} from "@ionic-native/google-maps/ngx";
import { Storage } from "@ionic/storage-angular";
import {
  NativeGeocoder,
  NativeGeocoderOptions,
  NativeGeocoderResult,
} from "@awesome-cordova-plugins/native-geocoder/ngx";
import {
  FileTransfer,
  FileTransferObject,
  FileUploadOptions,
} from "@awesome-cordova-plugins/file-transfer/ngx";
import { environment } from "src/environments/environment";
import { ModalAjustarImagenPage } from "../modal-ajustar-imagen/modal-ajustar-imagen.page";
import { TranslateService } from "@ngx-translate/core";
declare var Google: any;

@Component({
  selector: "app-editar-publicacion",
  templateUrl: "./editar-publicacion.page.html",
  styleUrls: ["./editar-publicacion.page.scss"],
})
export class EditarPublicacionPage implements OnInit {
  @ViewChild("MapDiv", { static: false }) private Mapdiv: any;
  @ViewChild("TypeSelect", { static: false }) private TypeSelect: any;
  token: any;
  isLoading: boolean = true;
  Post: any;
  NoPost: boolean = false;
  MustShowMap: boolean = false;
  MarkerInstance: any;
  Markertmp: any;
  base64img: any;
  HoldArchiveValue: any;
  MapStatus: MapState = {
    PositionName: "",
    PositionSelected: {
      lat: 0,
      lng: 0,
    },
    MapIsVisible: false,
  };
  form: FormGroup;
  temas: any;
  map: GoogleMap;

  CameraVideoOptions: CameraOptions = {
    quality: 100,
    resultType: CameraResultType.DataUrl,
   
    // encodingType: this.camera.EncodingType.JPEG,
 source: CameraSource.Camera,
    width: 1920,
    height: 1080,
    // allowEdit: true,
    // correctOrientation: true,
  };

  SelectedFileType = {
    isImage: false,
    isVideo: false,
    isDocument: false,
  };

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
    private fb: FormBuilder,
    private api: ApiService,
    private utils: UtilitiesService,
    private nav: NavController,
    private geo: NativeGeocoder,private ngzone: NgZone,
    private storage: Storage,
    private transfer: FileTransfer,
    private alertController: AlertController,
    private appref: ApplicationRef,
    private modalController: ModalController,
    private translateService: TranslateService
  ) {}

  async ngOnInit() {
    await this.innitPage().then(() => {
      this.isLoading = false;
    });

    if (this.NoPost) {
      this.nav.back();
    } else {
      this.form = this.fb.group({
        id: [this.Post.id],
        archivo: [""],
        titulo: [this.Post.titulo, Validators.required],
        descripcion: [this.Post.descripcion, Validators.required],
        tema_id: [this.Post.tema_id, Validators.required],
        lat: [this.Post.lat],
        tipo_archivo: [this.Post.tipo_archivo, Validators.required],
        longitud: [this.Post.longitud],
        fecha: [this.Post.fecha, Validators.required],
        decada: [this.Post.decada, Validators.required],
        ubicacion: [this.Post.ubicacion],
      });
    }
  }

  async openCropImageModal() {
    const modal = await this.modalController.create({
      component: ModalAjustarImagenPage,
      componentProps: {
        base64img: this.base64img,
        mode: "UPDATE",
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

  //Obtencion de Datos de la pagina
  async innitPage() {
    // console.log("HISTORY IS ");
    // console.log(history.state);

    this.storage.get("auth-token").then((token) => {
      this.token = token;
      console.log("Token", this.token);
    });
    console.log("Post is");
    console.log(history.state.post);

    if (typeof history.state.post === "undefined") {
      this.NoPost = true;
    } else {
      this.Post = history.state.post;
      this.base64img = this.Post.archivo;
      this.appref.tick();
      await this.traerTemas();
    }
  }

  public async traerTemas() {
    this.api.getEntity("temas").subscribe((temas: any) => {
      this.temas = temas;
    });
  }

  //Metodos de Mapa

  async EnterMapMode(event) {
    console.log("Entra");

    console.log(event.target);
    // this.MustShowMap = event.target.checked;
    if (!this.MustShowMap) {
      await this.utils.showLoading(this.translateService.instant("Cargando el mapa"));
      this.OpenMap()
        .then(() => {
          this.utils.dismissLoading();
        })
        .catch((err) => {
          console.error(err);

          this.utils.dismissLoading();
        });
    } else {
      await this.utils.showLoading(this.translateService.instant("Eliminando el mapa"));
      this.DestroyMap()
        .then(() => {
          this.utils.dismissLoading();

          console.log("llega al then en destruyemapa");
        })
        .catch((err) => {
          console.error(err);

          this.utils.dismissLoading();
        });
    }
  }

  async DestroyMap() {
    console.log("Se destruye el mapa");

    if (this.map != null || typeof this.map != "undefined") {
      // console.log(typeof this.map);
      await this.map
        .remove()
        .then(() => {
          console.table(this.map);
          this.HideMapDiv();
        })
        .catch((err) => {});
    }
  }

  async OpenMap() {
    console.log("Se ve el mapa");
    await this.loadMap()
      .then(() => {
        console.log("Mapa cargado");
      })
      .catch((err) => {
        console.log("Hay un error con el mapa");
      });
  }
  public async loadMap() {
    // this.MustShowMap = true;
    this.ToggleMapDiv();
    Environment.setEnv({
      API_KEY_FOR_BROWSER_DEBUG: "AIzaSyDmfNZjzV2rN3hJZuMihXZIiB3Hjkw0LtE",
      API_KEY_FOR_BROWSER_RELEASE: "AIzaSyDmfNZjzV2rN3hJZuMihXZIiB3Hjkw0LtE",
    });
    Environment.setBackgroundColor("white");
    let mapOptions: GoogleMapOptions;

    mapOptions = {
      camera: {
        target: {
          lat: 0,
          lng: 0,
        },
        zoom: 15,
        tilt: 30,
      },
    };

    this.map = await GoogleMaps.create("map-container", mapOptions);

    if (this.Post.lat != null && this.Post.longitud != null) {
      this.map.moveCamera({
        target: { lat: this.Post.lat, lng: this.Post.longitud },
      });

      let iconpin: MarkerIcon = {
        url: environment.domainUrl + "storage/QTYH7JKuCqj64pYlepLvNIozVJ4cboTsRjrPGpxz.png",
        size: {
          width: 40,
          height: 60,
        },
      };

      this.MarkerInstance = this.map.addMarkerSync({
        animation: "DROP",
        icon: iconpin,
        title: "Ubicacion actual",
        position: { lat: this.Post.lat, lng: this.Post.longitud },
      });

      this.MarkerInstance.showInfoWindow();
    } else {
      this.map.getMyLocation().then((res) => {
        this.map.moveCamera({
          target: res.latLng,
        });
      });
    }

    this.map
      .one(GoogleMapsEvent.MAP_READY)
      .then(async () => {
        this.map.setMapTypeId("MAP_TYPE_SATELLITE");
        this.map.setMyLocationEnabled(true);
        this.map.setMyLocationButtonEnabled(true);

        this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((res) => {
          this.SetNewMarker(res);
          this.SetValuesOnForm(res);
        });
      })
      .catch((error) => {
        console.log(error);

        this.utils.showAlert(
          this.translateService.instant("Ubicacion desactivada"),
          this.translateService.instant("Sin acceso a la ubicacion no se podra actualizar la localización")
        );
      });
  }

  ToggleMapDiv() {
    this.MustShowMap = true;
  }

  HideMapDiv() {
    this.MustShowMap = false;
  }

  //Debug

  LogFormValues() {
    console.log("Form Values");
    console.log(this.form.value);
  }
  // Utilities

  IsEmptyString(myString: string) {
    let trimmedString = myString.trim();

    if (trimmedString.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  //Metodos set
  SetValuesOnForm(res) {
    let value = res[0];
    this.form.get("lat").setValue(value.lat);
    this.form.get("longitud").setValue(value.lng);
  }

  async SetArchivoValue() {
    if (this.base64img == this.Post.archivo) {
      return true;
    } else {
      const allFalse = Object.values(this.SelectedFileType).every(
        (val) => !val
      );
      if (this.SelectedFileType.isVideo) {
        let result: boolean;

        if (this.CheckVideoValidity()) {
          await this.uploadVideo()
            .then(() => {
              result = true;
            })
            .catch(() => {
              result = false;
            });
        }

        return result;
      } else if (this.SelectedFileType.isImage) {
        console.log("Is image, returnig true");
        return true;
      } else if (allFalse) {
        console.log("Same ");

        return true;
      }
    }
  }

  CheckVideoValidity() {
    console.log("QUE HAY EN BASE64");
    console.log(this.base64img);
    if (typeof this.base64img != "undefined" && this.base64img != null) {
      return true;
    } else {
      return false;
    }
  }

  async SetNewMarker(valueFull: any) {
    let value = valueFull[0];
    let info = "Nueva ubicación desconocida";
    let loc = null;

    await this.GetInfoFromLatLng(value).then((res) => {
      console.log("LLEGA ESTO ", res);
      loc = res;
    });

    if (loc !== null) {
      info = this.SetLocalizacionValue(loc);
    }

    // console.log(resultados);

    if (this.Markertmp && this.Markertmp.getMap()) {
      this.Markertmp.remove();
      this.Markertmp = null;
    }

    let iconpin: MarkerIcon = {
      url: environment.domainUrl + "storage/nhWaZo9RlQX8pXLfgrvrhz4jJAJqYcoLhoFzDDOZ.png",
      size: {
        width: 40,
        height: 60,
      },
    };

    let Marker = {
      animation: "DROP",
      icon: iconpin,
      title: info,
      position: {
        lat: value.lat,
        lng: value.lng,
      },
    };

    this.map.addMarker(Marker).then((marker) => {
      this.Markertmp = marker;
      marker.showInfoWindow();
    });
  }

  SetLocalizacionValue(resultados: any): string {
    let Localizacion = "";

    let fields = [
      "thoroughfare",
      "subLocality",
      "locality",
      "subAdministrativeArea",
      "administrativeArea",
      "countryName",
    ];

    fields.forEach((element) => {
      if (!this.IsEmptyString(resultados[element])) {
        Localizacion += "," + resultados[element];
      }
    });

    if (Localizacion.startsWith(",")) {
      Localizacion = Localizacion.substring(1);
    }
    this.form.get("ubicacion").setValue(Localizacion);
    return Localizacion;
  }

  async GetInfoFromLatLng(value): Promise<NativeGeocoderResult> {
    console.log("llega =>");
    console.log(value);

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1,
    };
    let result = await this.geo
      .reverseGeocode(value.lat, value.lng, options)
      .then((result: NativeGeocoderResult[]) => {
        console.log(result);
        return result[0];
      })
      .catch((error: any) => {
        console.log(error);
        return null;
      });

    return result;
  }

  //Set Tipo De Archivo//
  async cambiarTipoArchivo(event) {
    this.HoldArchiveValue = this.form.get("archivo").value;
    this.form.get("archivo").setValue("");
    console.log(event);

    if (this.Post.wasQuestion && event.detail.value == 2) {
      await this.presentAlertConfirm(event);
    } else {
      this.form.patchValue({
        tipo_archivo: event.detail.value,
      });

      this.setUploadType(event);
    }
  }

  // Reset methods

  resetSelectValue() {
    this.TypeSelect.value = "";
  }
  resetSelectedFileValues() {
    this.base64img = null;
    for (var i in this.SelectedFileType) {
      if (this.SelectedFileType[i] === true) {
        this.SelectedFileType[i] = false;
      }
    }
  }

  ResetArchiveValue() {
    this.form.get("archivo").setValue(this.HoldArchiveValue);
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
        this.SelectedFileType.isDocument = true;
        console.log(this.SelectedFileType);

        break;
    }
  }
  setFechaValueIfVoid() {
    let fech = this.form.get("fecha").value;

    console.log("fecha value es =>", fech);

    console.log("fecha no estaba vacio");
    let date: string = this.form.get("fecha").value;
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
      }

      if (IsCorrect) {
        this.form.get("fecha").setValue(date);
        return true;
      } else {
        return false;
      }
    }
    else{
      return false;
    }
  }
  // Metodos form
  async CheckIfFormIsValid(): Promise<boolean> {
    // this.setMapValidators();
    // this.setFechaValueIfVoid();
    let validForm = this.form.valid;
    console.log("IS VALID?");
    console.log(validForm);
    console.log("VALUES=>");
    console.log(this.form.value);
    if (validForm) {
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

  async SubmitForm() {
    if (this.setFechaValueIfVoid()) {
      await this.CheckIfFormIsValid().then(async (validform) => {
        console.log("LLEGA AL SUMBIT=>");

        console.log(validform);

        if (validform) {
          // await this.SetArchivoValue();

          console.log("Se subira la publicacion");
          await this.utils.showLoading(this.translateService.instant("Actualizando publicacion..."));

          this.api
            .updateEntity("publicaciones", this.Post.id, this.form.value)
            .subscribe(
              () => {
                this.api.postChanges.next(true);
                this.utils.dismissLoading();
                this.nav.navigateForward("tabs/home");
                this.utils.showToast(this.translateService.instant("Se ha actualizado su publicación"));
              },
              (error) => {
                // this.utils.showToast(codeErrors(error));
                this.utils.dismissLoading();
                this.utils.showToast(
                  this.translateService.instant("Ha ocurrido un error al actualizar la publicación")
                );
              }
            );
        } else {
          console.log("No se subira la publicacion");
          let invalidforms = this.GetInvalidControls();
          this.utils.showAlert(
            this.translateService.instant("Los siguentes campos estan incompletos"),
            invalidforms
          );
        }
      });
    } else {
      this.utils.showAlert(this.translateService.instant("¡Vaya!"), this.translateService.instant("La fecha y la decada no coinciden"));
    }
  }

  GetInvalidControls() {
    let InvalidControls = "";
    for (const control in this.form.controls) {
      this.form.updateValueAndValidity();
      if (this.form.controls[control].invalid) {
        if (control === "tema_id") {
          let name = "tema";
          InvalidControls += "" + name + "\n\n";
        } else {
          InvalidControls += "" + control + "\n\n";
        }
        console.log(control + " Invalid");
      }
    }
    return InvalidControls;
  }

  //Obtener Archivos//
  getVideo() {
    let options = this.CameraVideoOptions;
    Camera.getPhoto(options).then(async (file) => {
      console.log(file);

      let extension = this.utils.getFileExtension(file.path);
      console.log("EXTENSION=>", extension);

      if (extension === "mp4") {
        this.base64img = file.dataUrl;

        this.form.patchValue({ archivo: this.base64img });
      } else {
        this.utils.showAlert(this.translateService.instant("¡Vaya!"), 
        this.translateService.instant("La extension del video debe ser mp4"));
      }
    });
  }

  public async adjuntarImagen(): Promise<void> {
    let CameraImageOptions: CameraOptions = {
      quality: 100,
      resultType: CameraResultType.DataUrl,
      
      
      source: CameraSource.Photos,
     width: 1920,
     height: 1080,
      // allowEdit: true,
      correctOrientation: true,
    };

    let options = CameraImageOptions;
    this.ngzone.run(() => {
      Camera
        .getPhoto(options)
        .then(async (urlFoto) => {
          this.base64img = "data:image/jpeg;base64," + urlFoto;

          console.log("SETEADO EN BASE64");
          console.log(this.base64img);
          this.form.patchValue({ archivo: this.base64img });

          // console.log(urlFoto);
        })
        .catch((error) => {
          this.utils.showAlert(this.translateService.instant("Error al obtener imagen"), error);
        });
    });
  }

  async uploadVideo() {
    let file = this.base64img;
    console.log(this.token);

    await this.utils.showLoading(this.translateService.instant("Subiendo vídeo..."));

    const fileTransfer: FileTransferObject = this.transfer.create();
    const options: FileUploadOptions = {
      fileKey: "file",
      fileName: file,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      httpMethod: "POST",
      headers: {
        Accept: "video/mp4",
        Authorization: "Bearer " + this.token,
      },
    };
    await fileTransfer.upload(file, environment.apiUrl + "video", options).then(
      (data: any) => {
        console.table(data);
        console.log("entra en filetransfer");
        this.utils.dismissLoading();
        if (data.bytesSent > 55100000) {
          console.log("Error");

          this.utils.showToast(
           this.translateService.instant( "El tamaño del vídeo no puede ser superior a 55 MB. El vídeo no ha sido subido.")
          );
          this.form.patchValue({ archivo: "" });
          return false;
        } else {
          console.log("Entra en el else");
          let res = JSON.parse(data.response);
          console.log("JOTASON");
          console.log(res);

          this.form.patchValue({ archivo: res.url });
          this.utils.dismissLoading();
          this.utils.showToast(this.translateService.instant("Vídeo subido correctamente."));

          return true;
        }
      },
      (err) => {
        console.log("Catch el error");
        this.form.patchValue({ archivo: "" });
        console.log(err);
        this.utils.dismissLoading();
        this.utils.showToast(this.translateService.instant("Error subiendo el vídeo."));
        return false;
      }
    );
  }

  async presentAlertConfirm(event) {
    const alert = await this.alertController.create({
      header: "Aviso",
      message:
        this.translateService.instant("Si insertas un video en esta publicacion, no podra ser reactivada como pregunta"),
      buttons: [
        {
          text: this.translateService.instant("Cancelar"),
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            // this.resetSelectValue();
            this.resetSelectedFileValues();
            event.preventDefault();
          },
        },
        {
          text: this.translateService.instant("Continuar"),
          handler: () => {
            this.form.patchValue({
              tipo_archivo: event.detail.value,
            });

            this.setUploadType(event);
          },
        },
      ],
    });
    await alert.present();
  }

  back() {
    this.nav.navigateBack("/detalle-publicacion/" + this.Post.id, {
      state: {
        post: this.Post,
      },
    });
  }
}
