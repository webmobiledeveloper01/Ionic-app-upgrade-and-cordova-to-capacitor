import { Component, NgZone, OnInit } from "@angular/core";
import {
  Platform,
  NavController,
  ToastController,
  ModalController,
} from "@ionic/angular";
// Capacitor
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';


import { ApiService } from "./services/api.service";
import { User } from "./models/User";
// import { Push, PushObject, PushOptions } from "@ionic-native/push/ngx";
import { environment } from "../environments/environment";
// import { Stripe } from "@awesome-cordova-plugins/stripe/ngx";
import { AuthenticationService } from "./services/authentication.service";
import { Storage } from "@ionic/storage-angular";
import { HttpErrorResponse } from "@angular/common/http";
import { UtilitiesService } from "./services/utilities.service";
// import { Deeplinks } from "@ionic-native/deeplinks/ngx";
import { HomePage } from "./pages/home/home.page";
import { ProfilePage } from "./pages/profile/profile.page";
import { DetallePublicacionPage } from "./pages/detalle-publicacion/detalle-publicacion.page";
import { Router } from "@angular/router";
import { UserService } from "./services/user.service";
import { StorageService } from "./services/storage.service";
import { TranslateService } from "@ngx-translate/core";
// import { SplashPage } from "../app/pages/splash/splash.page";
declare var cordova: any;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  standalone: false,
})
export class AppComponent implements OnInit {
  user: User;
  public isLoading: boolean = true;
  public appPages = [
    {
      title: "Inicio",
      url: "tabs/home",
      src: "/assets/icon/Inicio.svg",

      // icon: "home",
    },
    {
      title: "Perfil",
      url: "tabs/perfil",
      // icon: "person",
      src: "/assets/icon/Perfil.svg",
    },
    {
      title: "Chats",
      url: "/chats",
      src: "/assets/icon/Chats.svg",
      // icon: "chatboxes",
    },
    {
      title: "Grupos",
      url: "tabs/canales-grupos",
      src: "/assets/icon/Grupos.svg",
    },
    {
      title: "Canales temáticos",
      url: "tabs/only-chanels",
      src: "/assets/icon/Canales.svg",
    },
    {
      title: "Crear impacto",
      url: "modal-banners",
      src: "/assets/icon/Crear impacto.svg",
      // icon:"medal"
    },
    {
      title: "Notificaciones",
      url: "/notification-user",
      // icon: "notifications",
      src: "/assets/icon/Notificaciones.svg",
    },
    {
      title: "Recetas",
      url: "/mis-recetas",
      // icon: "restaurant",
      src: "/assets/icon/Recetas.svg",
    },
    {
      title: "Subir recetas",
      url: "/subir-recetas",
      src: "/assets/icon/subir-recetas.svg",
    },
    {
      title: "Geoask",
      url: "/new-question",
      src: "/assets/icon/memoria.svg",
    },

    // {
    //   title: "Memoria colectiva",
    //   url: "/memoria-colectiva",
    //   icon: "open",
    // },
    // <ion-icon name="pizza"></ion-icon>
  ];

  constructor(
    private platform: Platform,

    private apiService: ApiService,
   // TODO
    // private push: Push,
    // private events: Events,
    // private stripe: Stripe,
    // protected deeplinks: Deeplinks,
    private auth: AuthenticationService,
    private navCtrl: NavController,
    // private storage: Storage,
    private utilities: UtilitiesService,
    private toastController: ToastController,
    private zone: NgZone,
    private userService: UserService,
    private storageService: StorageService,
    private translateService: TranslateService
  ) {

    
  }

  /**
   * Nos suscribimos a los cambios dle perfil
   */
  async ngOnInit() {
   

    if (this.platform.is("cordova")) {
      this.platform.ready().then(async () => {
        const currenttoken = await this.storageService.init();

        this.auth.authenticationState.next(currenttoken);
    
        this.translateService.setDefaultLang("es");
        this.auth.authenticationState.subscribe(async (token) => {
          if (token != "logout" && token != "" && token != null) {
            await this.SetNotifications()
              .then()
              .catch((err) => {
                console.warn("***ERROR NOTITIFICACIONES***");
                console.error(err);
                console.warn("***ERROR NOTITIFICACIONES***");
              });
            this.prepararStripe();
    
            this.apiService.setTokenToHeaders(token);
            this.navCtrl.navigateRoot("tabs").then(async () => {
              // console.log("User undefined");
              await this.userService
                .setUserFromDB()
                .then(async () => {
                  await this.userService
                    .getUser()
                    .then((user) => {
                      this.user = user;
                      this.CheckIfUserIsBanner();
                      this.isLoading = false;
                      // this.navCtrl.navigateRoot("/home");
                    })
                    .catch((err) => this.handleError(err));
                })
                .catch((err) => this.handleError(err));
    
              // console.log("USER IS=>");
              // console.log(this.user);
            });
          } else if (token == "logout") {
            this.userService.logout();
            this.user = undefined;
            this.prepararStripe();
            this.apiService.removeTokenToHeaders();
            this.navCtrl.navigateRoot("register").then(() => {
              this.isLoading = false;
            });
          } else {
            this.isLoading = false;
    
            // console.log("primera vez");
          }
    
          // IMPORTANTE: para comprobar si la app está o no suspendida, debe ponerse el dominio en la propiedad "domainUrl" del archivo "src/environments/environment.ts"
          this.checkIfAppIsSuspended();
        });
        // this.splashScreen.show();
        // await this.storage.get("auth-token").then((res) => {
        //   console.log("es null?");
        //   console.log(res);
        //   if (!res || res == "") {
        //     this.ShowSplash();
        //   }
        // });

        this.setUpDeepLinks();
        // StatusBar.setStyle("");
      });
    }

    this.apiService.userChanges.subscribe((user: User) => {
      this.user = user;

      this.CheckIfUserIsBanner();
    });
  }
  cerrarsesion(){
    
  }
  async ShowSplash() {
    // let modal = await this.modalController.create({
    //   component: SplashPage,
    //   keyboardClose: true,
    // });
    // modal.present();
    console.log("Se llama al splash");
    this.navCtrl.navigateRoot("/splash");
  }

  handleError(err: any) {
    console.log("Error: " + err);
    this.isLoading = false;

    this.utilities.showToast(
      "Parece que hay un error de conexion, pruebe mas tarde"
    );

    this.utilities.dismissLoading();

    this.navCtrl.navigateRoot("");

    // setTimeout(() => {
    //   navigator["app"].exitApp();
    // }, 1000);
  }

  CheckIfUserIsBanner() {
    if (this.user.role_id === 4) {
      // console.log("IS BANNER");

      this.appPages[1] = {
        title: "Perfil",
        url: "tabs/perfil-banners",
        // icon: "person",
        src: "/assets/icon/Perfil.svg",
      };
    } else {
      // console.log("NO BANNER");
    }
  }

  // requestLocation() {
  //   cordova.plugins.locationAccuracy.request(
  //     () => {
  //       console.log("Localizacion rechazada");
  //     },
  //     () => {
  //       console.log("Localizacion rechazada");
  //     }
  //   );
  // }

  setUpDeepLinks() {
    console.log("Entra en el set deeplinks");
    // TODO
    // this.deeplinks
    //   .route({
    //     "/detalle-publicacion": HomePage,
    //   })
    //   .subscribe(
    //     async (match) => {
    //       console.log("Successfully routed", match);

    //       await this.utilities.showLoading("Cargando...");

    //       setTimeout(() => {
    //         if (match.$link.host == "timemapp.davidtovar.dev") {
    //           console.log("DENTRO!!!!");

    //           let pathArray = String(match.$link.path).split("/");

    //           console.log(pathArray);

    //           let route = pathArray[1];

    //           let id = pathArray[2];

    //           //                   let id = pathArray[3];

    //           this.navCtrl.navigateForward([route + "/" + id]).then(() => {
    //             this.utilities.dismissLoading();
    //           });
    //         } else {
    //           console.log("FUERA!!!!");
    //         }
    //       }, 2000);
    //     },
    //     (nomatch) => {
    //       console.log("NO Successfully routed", nomatch); // console.warn('Unmatched Route', nomatch.$link);
    //     }
    //   );

    //// console.log("Remember to activate DeepLinks in app.components.ts");

    // this.deeplinks
    //   .route({
    //     home: "home",
    //     "/publication/:id": "detalle-publicacion/:id",
    //   })
    //   .subscribe(
    //     (match) => {
    //       // console.log("Successfully matched route", match);
    //       const internalPath = `/${match.$route}`;
    //       this.zone.run(() => {
    //         this.router.navigateByUrl(internalPath);
    //       });
    //     },
    //     (nomatch) => {
    //       // nomatch.$link - the full link data
    //       console.error("Got a deeplink that didn't match", nomatch);
    //     }
    //   );
  }

  /**
   * Comprueba si el dominio de la aplicación está suspendido. Si lo está, muestra un mensaje de aviso al usuario
   */
  public checkIfAppIsSuspended() {
    this.apiService.checkAppDomain().subscribe(
      async (response) => {
        // no hacemos nada, ya que el dominio de la aplicación estaría activado
      },
      async (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status == 0 || errorResponse.status == 403) {
          this.utilities.showAlert(
            "Esta app no ha sido renovada",
            "Si usted es el propietario, por favor hable con nosotros en el 956 105 343 para renovar el servicio o contacte con facturacion@xerintel.es",
            false
          );
        }
      }
    );
  }

  /**
   * Configuración de las notificación push
   */
  public pushNotifications(): void {
    // TODO
    // const options: PushOptions = {
    //   android: {
    //     senderID: environment.senderID,
    //     icon: "timeapp",
    //   },
    //   ios: {
    //     alert: "true",
    //     badge: true,
    //     sound: "true",
    //   },
    //   windows: {},
    // };

    // const pushObject: PushObject = this.push.init(options);

    // pushObject.on("notification").subscribe((notification: any) => {
    //   // this.apiService.InvitationNotificactionChanges.next("");
    //   // console.log("NOTIFICACION");
    //   // console.log(notification);

    //   //// console.log(notification);

    //   // fix en ios para recibir correctamente los datos de la notificación
    //   if (this.utilities.getPlatform() === "ios") {
    //     notification.additionalData["apiData"] = JSON.parse(
    //       notification.additionalData["gcm.notification.apiData"]
    //     );
    //   }

    //   if (notification.additionalData.apiData.url == "/notification-user") {
    //     this.zone.run(() => {
    //       //Cuando está dentro de la app muestra un toast
    //       if (notification.additionalData.foreground) {
    //         this.showToastMessage(notification);
    //       } else {
    //         this.navCtrl.navigateForward(
    //           notification.additionalData.apiData.url
    //         );
    //       }
    //     });
    //   } else if (notification.additionalData.apiData.url == "/chats") {
    //     this.zone.run(() => {
    //       this.events.publish(
    //         "add-mensaje",
    //         notification.additionalData.apiData.mensaje
    //       );

    //       //Cuando está dentro de la app muestra un toast
    //       if (notification.additionalData.foreground) {
    //         this.showToastMessage(notification);
    //       } else {
    //         this.navCtrl.navigateForward(
    //           notification.additionalData.apiData.url
    //         );
    //       }
    //     });
    //   }

    //   // this.events.publish(
    //   //   "add-mensaje",
    //   //   notification.additionalData.apiData.mensaje
    //   // );
    // });

    // pushObject.on("registration").subscribe((registration: any) => {
    //   const regId = registration.registrationId;
    //   this.apiService.guardarTokenDeRegistro(regId).subscribe(
    //     (response) => {
    //       // console.log(response);
    //     },
    //     (error) => {
    //       // console.log(error);
    //     }
    //   );
    // });

    // pushObject
    //   .on("error")
    //   .subscribe((error) => console.error("Error with Push plugin", error));
  }

  async SetNotifications() {
    console.log(cordova);

    await cordova.plugins.firebase.messaging.requestPermission({
      forceShow: false,
    });

    let token;
    try {
      token = await cordova.plugins.firebase.messaging.getToken();
    } catch (err) {
      console.log("err obtener token firebase");
      console.log(err);
      return;
    }
    console.log("token = ");
    console.log(token);
    if (token) {
      this.apiService.guardarTokenDeRegistro(token).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    cordova.plugins.firebase.messaging.onBackgroundMessage((payload) => {
      console.log("New background FCM message: ", payload);

      this.apiService.notificationChanges.next(payload);
    });

    cordova.plugins.firebase.messaging.onMessage((payload) => {
      console.log("New foreground FCM message: ", payload);
      this.apiService.notificationChanges.next(payload);
      // this.utilities.showAlert(payload.title, payload.message);
      this.showToastMessage(payload);
    });
  }

  /**
   * Preparamos stripe con su configuración
   */
  public prepararStripe(): void {
    // console.log("Entra en Stripe");
    // TODO
    // this.stripe.setPublishableKey(environment.stripePublishableKey);
  }

  public async showToastMessage(notification) {
    const toast = await this.toastController.create({
      header: notification.title,
      message: notification.message,
      position: "top",
      animated: true,
      // color: "primary",
      cssClass: "CustomNotificationToast",
      buttons: [
        {
          side: "end",
          text: "Abrir",
          handler: () => {
            this.zone.run(() => {
              this.navCtrl.navigateForward("/notificaciones");
              // if (notification.additionalData.apiData.url == "/chats") {
              //   this.navCtrl.navigateForward(
              //     notification.additionalData.apiData.url
              //   );
              // } else {
              //   this.navCtrl.navigateForward("/notification-user");
              // }
            });
          },
        },
        {
          text: "Eliminar",
          //icon:'',
          cssClass: "cancelbtn",
          role: "cancel",
          handler: () => {
            // console.log("Cancel clicked");
          },
        },
      ],
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    // console.log("onDidDismiss resolved with role", role);
  }

  setLanguage(lang: string){
    this.translateService.setDefaultLang(lang);
  }
}
