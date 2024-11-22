import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Mensaje } from 'src/app/models/Mensaje';
import { Camera, CameraOptions, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-chat-footer',
  templateUrl: './app-chat-footer.component.html',
  styleUrls: ['./app-chat-footer.component.scss'],
})
export class AppChatFooterComponent implements OnInit {

  public message: Mensaje;
  @Input() placeholder: string;
  @Output() sendText = new EventEmitter<Mensaje>();


  constructor() { }

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
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      width: 1920,
      height: 1080,
      allowEditing: true,
      correctOrientation: true,
    }
    Camera.getPhoto(options).then((urlFoto) => {
      let base64img = urlFoto.dataUrl;
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
