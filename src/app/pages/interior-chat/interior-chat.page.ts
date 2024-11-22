import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ActivatedRoute } from '@angular/router';
import { Mensaje } from 'src/app/models/Mensaje';
import { EventsService } from 'src/app/services/events.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-interior-chat',
  templateUrl: './interior-chat.page.html',
  styleUrls: ['./interior-chat.page.scss'],
})
export class InteriorChatPage implements OnInit {

  @ViewChild('content') private content: any;

  public messages: Mensaje[];
  public idChat: number;
  public chatName: string;
  public lastMessage;
  public isLoading: boolean = true;


  constructor(private apiService: ApiService,
    private utilities: UtilitiesService,
    private route: ActivatedRoute,
    private events: EventsService,
    private translateService: TranslateService,
    private ngZone: NgZone) {

    this.route.params.subscribe(params => {
      this.idChat = params.id_chat;
      this.chatName = params.nombre_chat;
      this.lastMessage = params.ultimo_mensaje;
    })




  }

  public ionViewDidEnter():void{
    this.getMensajes();
  }
  /* Obtenemos los mensajes y nos suscribimos a las notificaciones push */
  public ngOnInit(): void {
    
    // TODO *** Create a new evet service with Behaviour subject
    
    
    
    this.events.addMensaje().subscribe((mensaje) => {
      this.ngZone.run(() => {
        let m: Mensaje = {
          id: mensaje.id,
          texto: mensaje.texto,
          user_name: mensaje.user_name,
          created_at: mensaje.created_at,
          urlImagen: mensaje.urlImagen,
          avatar: mensaje.avatar,
        }
        console.log("mensaje", m);
        setTimeout(() => {
          this.lastMessage = m.created_at;
          this.messages.push(m);
          this.content.scrollToBottom(300);
        }, 1000);

      })
    });
  }

  public getMensajes(): void {
    this.isLoading = true;
    this.apiService.getSubEntity('chats', this.idChat, 'mensajes').subscribe((messages: Mensaje[]) => {
      this.isLoading = false;
      this.messages = messages;
      setTimeout(() => {
        this.content.scrollToBottom(1000);
      }, 200);
    }, error => {
      this.isLoading = false;
      console.log(error);
      this.utilities.showToast(this.translateService.instant("No se pueden obtener los mensajes"));
    });
    // this.apiService.deleteEntity('mensajesNuevos', this.idChat).subscribe(res => {
    //   console.log(res);
    // }, error => {
    //   console.log(error);
    // })
  }

  /* Enviar mensaje */
  public sendMessage(message: Mensaje): void {

    if (message.texto != "" || message.imagen) {
      let msj: Mensaje = {
        texto: message.texto,
        created_at: Date.now(),
        chat_id: this.idChat,
        imagen: message.imagen,
      }
      console.log(message);


      this.apiService.addSubEntity('chats', this.idChat, 'mensajes', msj).subscribe((mensaje: Mensaje) => {
        this.messages.push(msj);
        this.lastMessage = msj.created_at;
        this.content.scrollToBottom(300);
      }, error => {
        this.utilities.showToast(this.translateService.instant("No se ha podido enviar el mensaje"));
        console.log(error);
      });

    }
  }


}
