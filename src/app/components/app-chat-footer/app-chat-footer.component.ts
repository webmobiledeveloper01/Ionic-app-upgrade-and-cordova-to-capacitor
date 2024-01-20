import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Mensaje } from 'src/app/models/Mensaje';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-chat-footer',
  templateUrl: './app-chat-footer.component.html',
  styleUrls: ['./app-chat-footer.component.scss'],
})
export class AppChatFooterComponent implements OnInit {

  public message: Mensaje;
  @Input() placeholder: string;
  @Output() sendText = new EventEmitter<Mensaje>();


  constructor(private camera: Camera) { }

  ngOnInit() {
    this.initMessage();
  }

  public onSendText(): void {
    this.sendText.emit(this.message);
    this.initMessage();
  }

  /**
   * Cambiar imagen de perfil
   */
  public addImage(): void {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 1920,
      targetHeight: 1080,
      allowEdit: true,
      correctOrientation: true,
    }
    this.camera.getPicture(options).then((urlFoto) => {
      let base64img = 'data:image/jpeg;base64,' + urlFoto;
      this.message.imagen = base64img;
      console.log(urlFoto);
    }).catch(error => {
      console.log("Error al obtener la imagen");

    })
  }

  public deleteImage(): void {
    console.log('Imagen borrada');
    this.message.imagen = null;
    this.message.urlImagen = null;
  }

  public initMessage():void{
    this.message = {
      texto: "",
      avatar: null,
      imagen: null,
      created_at: Date.now()
    }
  }
}
