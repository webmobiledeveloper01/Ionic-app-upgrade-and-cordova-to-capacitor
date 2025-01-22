import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ModalController, Platform } from "@ionic/angular";
import { Banner } from "src/app/models/Banner";

@Component({
  selector: "app-modal-ajustar-imagen",
  templateUrl: "./modal-ajustar-imagen.page.html",
  styleUrls: ["./modal-ajustar-imagen.page.scss"],
standalone: false,
})
export class ModalAjustarImagenPage implements OnInit {
  croppedImage = null;
  base64img: any;
  mode: string = "DEFAULT";

  STATE_NEW_UPLOAD = "UPLOAD";
  STATE_UPDATE_UPLOAD = "UPDATE";
  STATE_BANNER_UPLOAD = "BANNER";
  NEW_UPLOAD: boolean = false;
  UPDATE_UPLOAD: boolean = false;
  BANNER_UPLOAD: boolean = false;
  testBanner: Banner = null;
  aspectRatio:number;

  constructor(
    private modcontrol: ModalController,
    private platform: Platform
  ) {}

  ngOnInit() {
    // console.log(this.base64img);
    console.log("MODE=>", this.mode);

    this.setPageState();
    // this.getBase64ImageAspect();
  }
  getBase64ImageAspect() {
    const img = new Image();
    img.src = this.base64img;

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      console.log('Image Aspect Ratio:', aspectRatio);
      this.aspectRatio=aspectRatio;
    };
  }
  setPageState() {
    switch (this.mode) {
      case this.STATE_NEW_UPLOAD:
        this.aspectRatio=1/1;
        this.NEW_UPLOAD = true;
        console.log("MODE IS NEW UPLOAD");
        break;
      case this.STATE_UPDATE_UPLOAD:
        this.UPDATE_UPLOAD = true;
        console.log("MODE IS UPDATE UPLOAD");

        break;
      case this.STATE_BANNER_UPLOAD:
        this.BANNER_UPLOAD = true;
        this.aspectRatio=21/9;
        console.log("MODE IS NEW UPLOAD OF BANNER");
        this.testBanner = {
          id: 0,
          banner_publication_id: 0,
          banner_type_id: 0,
          banner_url: "",
          descripcion: "",
          fecha_duracion: "",
          imagen: this.croppedImage,
          lat: "string",
          lng: "string",
          section_id: 1,
          user_id: 1,
          zona_geografica: "string",
        };

        break;
    }
  }

  ionViewDidLoad() {}

  ngAfterViewInit() {}

  onClickAcept() {
    this.modcontrol.dismiss({ hasImage: true, image: this.croppedImage });
  }
  onClickCancel() {
    this.modcontrol.dismiss({ hasImage: false, image: null });
  }

  imageCropped(event) {
    this.croppedImage = event.base64;

    if (this.BANNER_UPLOAD) {
      this.testBanner.imagen = this.croppedImage;
    }
  }

  imageLoaded() {
    console.log("Image has been loaded");
  }

  loadImageFailed() {
    console.log("Image failed loading");
  }
}
