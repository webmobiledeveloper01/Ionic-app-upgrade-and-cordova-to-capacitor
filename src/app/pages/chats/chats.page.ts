import { Component, OnInit, NgZone } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { AlertController, NavController } from "@ionic/angular";
import { Chat } from "src/app/models/Chat";
import { Mensaje } from "src/app/models/Mensaje";
import { User } from "src/app/models/User";
// import { ThrowStmt } from "@angular/compiler";
import { AuthenticationService } from "src/app/services/authentication.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-chats",
  templateUrl: "./chats.page.html",
  styleUrls: ["./chats.page.scss"],
})
export class ChatsPage implements OnInit {
  public chats: Chat[] = [];
  public isLoading: boolean = true;
  public usuarios: User[] = [];

  constructor(
    private apiService: ApiService,
    private utilities: UtilitiesService,
    private alertCtrl: AlertController,
    // private events: Events,
    private ngZone: NgZone,
    private navCtrl: NavController,
    private auth: AuthenticationService,
    private translateService: TranslateService
  ) {}

  public ngOnInit(): void {
    /* Evento para notificaciones push */
    this.usuarios = null;

    this.apiService.chatChanges.subscribe(() => {
      this.getChats();
    });
    // this.events.subscribe('add-mensaje', (mensaje) => {
    //   this.ngZone.run(() => {
    //     this.chats = this.chats.map(x => {
    //       if (x.id == mensaje.chat_id) {
    //         x.mensajes_nuevos += 1;
    //         x.descripcion = mensaje.texto;
    //       }
    //       return x;
    //     });
    //   })
    // });
    this.getChats();
  }


  out(){
    this.auth.logout();
  }
  public back() {
    this.navCtrl.navigateForward("/tabs");
  }

  public getChats(): void {
    this.isLoading = true;

    this.apiService.getSubEntity("chats", 1, "mensajes").subscribe(
      (mensajes: Mensaje[]) => {
        console.log("Mensajes", mensajes);
      },
      (error) => {
        console.log(error);
      }
    );

    this.apiService.getEntity("chats").subscribe(
      (chats: Chat[]) => {
        this.isLoading = false;
        this.chats = chats.map((x) => {
          if (x.ultimo_mensaje) x.descripcion = x.ultimo_mensaje.texto;
          else x.descripcion = "Sin mensajes aún";
          if (x.ultimo_mensaje) x.ultimo_mensaje = x.ultimo_mensaje.created_at;
          else x.ultimo_mensaje = Date.now();
          return x;
        });
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
        this.utilities.showToast(this.translateService.instant("No se pueden obtener los chats"));
      }
    );
  }

  public async salirseChat(chat: Chat) {
    const alert = await this.alertCtrl.create({
      header: "Borrar chat",
      message: "¿Quieres borrar el chat " + chat.nombre + " ?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {},
        },
        {
          text: "Aceptar",
          handler: () => {
            this.utilities.showLoading(this.translateService.instant("Borrando chat"));
            this.apiService
              .deleteSubEntity("chats", chat.id, "unirse", 1)
              .subscribe(
                (res) => {
                  console.log(res);
                  this.utilities.dismissLoading();
                  this.getChats();
                },
                (error) => {
                  console.log(error);
                  this.utilities.dismissLoading();
                  this.utilities.showToast(this.translateService.instant("No se ha podido borrar el chat"));
                }
              );
          },
        },
      ],
    });

    await alert.present();
    this.apiService.chatChanges.next("")
  }

  buscarUsuarios(event) {
    console.log(event);

    if (event.detail.value == "") {
      /*      this.apiService.usuarios().subscribe((users: User[]) =>{
        this.usuarios = users;
      }) */
      this.usuarios = null;
    } else {
      let params = {
        palabra: event.detail.value,
      };
      this.apiService.buscadorUsuarios(params).subscribe((users: User[]) => {
        this.usuarios = users;
      });
    }
  }

  crearChat(usuario) {
    console.log(usuario);
    let params = {
      user2_id: usuario.id,
    };
    this.apiService.addEntity("chats", params).subscribe((chat) => {
      this.apiService.chatChanges.next("");
      this.navCtrl.navigateForward(
        "/interior-chat/" +
          chat.id +
          "/" +
          chat.nombre +
          "/" +
          chat.ultimo_mensaje
      );
      this.utilities.showToast(this.translateService.instant("Chat Creado con éxito"));
    });

    this.apiService.chatChanges.next("");
  }
}
