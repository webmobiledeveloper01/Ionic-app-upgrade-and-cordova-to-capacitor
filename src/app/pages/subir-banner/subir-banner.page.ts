import { Component, NgZone, OnInit } from "@angular/core";
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ModalController, NavController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { Camera, CameraOptions, CameraResultType, CameraSource } from "@capacitor/camera";
import { ModalLocalizacionPage } from "../modal-localizacion/modal-localizacion.page";
import { ModalAjustarImagenPage } from "../modal-ajustar-imagen/modal-ajustar-imagen.page";

@Component({
  selector: "app-subir-banner",
  templateUrl: "./subir-banner.page.html",
  styleUrls: ["./subir-banner.page.scss"],
})
export class SubirBannerPage implements OnInit {
  form: FormGroup;
  base64img: string = undefined;
  BannerType: number;
  BannerLocation: string;
  BannerUrl: string = "";
  URLStart = "https://www.";
  currentDate: Date = new Date();
  tomorrow = new Date();
  SetMinDate: string;
  maxYear: string = (new Date().getFullYear() + 10).toString();
  constructor(private ngzone: NgZone,
    private modalCtrl: ModalController,
    private utilities: UtilitiesService,
    private formBuilder: FormBuilder,
    private Api: ApiService,
    private nav: NavController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: ["", Validators.required],
      descripcion: ["", Validators.required],
      Logo_banner: ["", Validators.required],
      Zona_geografica: ["", Validators.required],
      Tipo_banner: ["", Validators.required],
      Url_banner: [this.URLStart, Validators.required],
      Duracion: ["", Validators.required],
      lat: ["", Validators.required],
      lng: ["", Validators.required],
    });
  }

  ionViewWillEnter() {
    this.tomorrow.setDate(this.currentDate.getDate() + 1);
    this.SetMinDate = this.tomorrow.toISOString();
  }

  public deleteImage() {
    this.base64img = undefined;
  }

  async SelectorEvent($event: Event, param: number) {
    this.BannerType = param;
    await this.openModal(param);

    // 1 es pais
    // 2 es region
    // 3 es provincia
    // 4 es localidad
  }

  async openModal(params) {
    // console.log("Al open llega");
    // console.log(id);

    const modal = await this.modalCtrl.create({
      component: ModalLocalizacionPage,
      cssClass: "modal-compartir",
      componentProps: {
        params: params,
      },
    });

    await modal.present();

    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data.data != undefined) {
        this.setDataToForm(data.data);
      } else {
        this.BannerType = undefined;
      }
    });
  }
  setDataToForm(data) {
    switch (this.BannerType) {
      case 1:
        this.BannerLocation = data.countryName + "," + data.countryCode;
        break;
      case 2:
        this.BannerLocation = data.administrativeArea + "," + data.countryCode;
        break;

      case 3:
        this.BannerLocation =
          data.subAdministrativeArea + "," + data.countryCode;
        break;

      case 4:
        this.BannerLocation = data.locality + "," + data.countryCode;
        break;
    }

    this.form.patchValue({ Zona_geografica: this.BannerLocation });
    this.form.patchValue({ lat: data.latitude });
    this.form.patchValue({ lng: data.longitude });

    console.log("Valores del form", this.form.value);
    console.log(this.BannerLocation);
    console.log(this.BannerType);
  }
  // UsingCapacitorPlugin: Implement Capacitor Camera Plugin
  // public adjuntarImagen(): void {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     targetWidth: 1920,
  //     targetHeight: 1080,
  //     allowEdit: false,
  //     correctOrientation: true,
  //   };
  //   this.ngzone.run(() => {
  //     this.camera
  //       .getPicture(options)
  //       .then(async (urlFoto) => {
  //         this.base64img = "data:image/jpeg;base64," + urlFoto;
  //       })
  //       .catch((error) => {
  //         this.utilities.showAlert("Error al obtener imagen", error);
  //       });
  //   });
  // }
  
  public async adjuntarImagen(): Promise<void> {
    try {
      const options: CameraOptions = {
        quality: 100,
        resultType: CameraResultType.DataUrl, // Use DataUrl for data URI
        source: CameraSource.Photos, // Use Photos for PhotoLibrary
        width: 1920,
        height: 1080,
        allowEditing: false,
        correctOrientation: true,
      };
  
      const capturedPhoto = await Camera.getPhoto(options);
  
      if (capturedPhoto.dataUrl) {
        this.base64img = capturedPhoto.dataUrl;
      } else {
        this.utilities.showAlert("Error", "No se pudo obtener la imagen");
      }
    } catch (error) {
      this.utilities.showAlert("Error al obtener imagen", error.message);
    }
  }

  async submitForm() {
    this.setDataToInsert();
    console.log(this.form.value);

    if (this.CheckValidForm()) {
      console.log(this.form.value);
      await this.utilities.showLoading("Subiendo banner...");

      let res = await this.Api.addEntity("banners", this.form.value)
        .toPromise()
        .then((res) => {
          this.utilities.dismissLoading();
          this.utilities.showToast(res.message);
          let change = {
            banner: res.data,
            add: true,
          };
          this.Api.bannerChanges.next(change);
          this.GoBack();
        })
        .catch((res) => {
          this.utilities.dismissLoading();
          this.utilities.showToast(res.message);
          this.GoBack();
        });
    } else {
      console.log("No se subira la publicacion");
      let invalidforms = this.GetInvalidControls();
      this.utilities.showAlert(
        "Los siguentes campos estan incompletos",
        invalidforms
      );
    }
  }
  CheckValidForm() {
    let url = this.form.get("Url_banner").value;

    if (!this.testUrl(url)) {
      this.form.get("Url_banner").setValue(this.URLStart);
      this.form.controls["Url_banner"].setErrors({ incorrect: true });
    } else {
      this.form.controls["Url_banner"].setErrors(null);
    }
    return this.form.valid;
  }
  setDataToInsert() {
    this.form.patchValue({ Logo_banner: this.base64img });
    this.form.patchValue({ Tipo_banner: this.BannerType });
    let fecha = this.form.get("Duracion").value;
    fecha = fecha.split("T");
    fecha = fecha[0];
    this.form.get("Duracion").setValue(fecha);
  }

  GetInvalidControls() {
    let InvalidControls = "";
    for (const control in this.form.controls) {
      this.form.updateValueAndValidity();
      if (this.form.controls[control].invalid) {
        if (this.formatName(control)) {
          if (control.includes("_")) {
            let name = control.replace("_", " ");
            InvalidControls += "" + name + "\n\n";
          }
          if (control.includes("url")) {
          }
        } else {
          InvalidControls +=
            "" + control[0].toUpperCase() + control.slice(1) + "\n\n";
        }
        console.log(control + " Invalid");
      }
    }
    return InvalidControls;
  }

  formatName(control: string) {
    if (control.includes("_") || control == "lat" || control == "lng") {
      return true;
    }
    else{
      return false;
    }
  }

  testUrl(input) {
    var httpRegex =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    // Validate URL
    return httpRegex.test(input); // Returns true
  }

  async openCropImageModal() {

    const modal = await this.modalController.create({
      component: ModalAjustarImagenPage,
      componentProps: {
        base64img: this.base64img,
        mode: "BANNER",
      },
    });
    modal.present();
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (typeof data != "undefined") {
        if (data.data.hasImage) {
          this.base64img = data.data.image;
        }
      }

      console.log("Se cierra la modal");
    });
  }


  GoBack() {
    this.nav.back();
  }
}
