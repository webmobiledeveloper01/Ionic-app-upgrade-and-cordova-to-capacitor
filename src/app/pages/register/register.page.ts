import { Component, OnInit } from "@angular/core";
import {
  // Events,
  MenuController,
  ModalController,
  NavController,
} from "@ionic/angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { confirmPassword } from "src/app/utils/utils";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { User } from "src/app/models/User";
import { codeErrors } from "../../utils/utils";
import { ModalReportarPage } from "../modal-reportar/modal-reportar.page";
import { ModalReportarPublicacionPage } from "../modal-reportar-publicacion/modal-reportar-publicacion.page";
import { ModalReportarMotivoPage } from "../modal-reportar-motivo/modal-reportar-motivo.page";
import { ModalInvitacionGrupoPage } from "../modal-invitacion-grupo/modal-invitacion-grupo.page";
import { ModalSolicitarGrupoPage } from "../modal-solicitar-grupo/modal-solicitar-grupo.page";
import { GoogleAuth, GoogleAuthPlugin } from "@codetrix-studio/capacitor-google-auth";
import { AuthenticationService } from "src/app/services/authentication.service";
import * as moment from "moment";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  isChecked: boolean = false;
  isCorrectAge: boolean = false;
  datepickerDate: any;

  currentLang: string = "en";
  constructor(
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private utilitiesService: UtilitiesService,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    // private events: Events, // TODO
    
    private auth: AuthenticationService,
    private translateService: TranslateService
  ) {
    
  }

  async ngOnInit() {
    this.currentLang = this.translateService.currentLang;
    GoogleAuth.initialize();
    this.menuCtrl.enable(false);
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      dia: ["", Validators.required],
      mes: ["", Validators.required],
      anyo: ["", Validators.required],
      fecha: ["", Validators.required],
      password_confirmation: ["", [Validators.required, confirmPassword]],
    });
  }

  public async submitForm(): Promise<void> {
    this.SetValues();

    if (this.checkFormData()) {
      console.log("Registro correcto");

      console.log(this.form.value);

      await this.utilitiesService.showLoading(this.translateService.instant("Registrando usuario..."));

      this.apiService.register(this.form.value).subscribe(
        (user: User) => {
          this.utilitiesService.dismissLoading();
          this.utilitiesService.showToast(this.translateService.instant("Registro correcto"));
          this.navCtrl.navigateRoot("/login");
        },
        (error) => {
          this.utilitiesService.dismissLoading();
          this.utilitiesService.showToast(codeErrors(error));
        }
      );
    }
  }

  onDiaChange(event: any){
    const selectedDate = new Date(event.detail.value);
    this.form.patchValue({
      mes: selectedDate,
      anyo: selectedDate,
      dia: selectedDate
    });
  }

  SetValues() {
    let fechaFromat = "";

    let fechas = ["anyo", "mes", "dia"];

    fechas.forEach((element) => {
      let value = this.form.get("dia").value;

      switch (element) {
        case "dia":
          fechaFromat += value.getDate();
          break;
        case "mes":
          let mes: string = (value.getMonth() + 1).toString();

          if (Number(mes) < 10) {
            mes = "0" + "" + mes;
          }

          fechaFromat += mes + "-";

          break;
        case "anyo":
          fechaFromat += value.getFullYear() + "-";

          break;
      }
    });
    let HowLong = moment().diff(fechaFromat, "years", false);

    HowLong > 12 ? (this.isCorrectAge = true) : (this.isCorrectAge = false);

    fechaFromat = moment().format(fechaFromat);

    this.form.get("fecha").setValue(fechaFromat);

    console.log(this.form.value);

    console.log(HowLong);
  }

  checkFormData() {
    if (this.form.valid && this.isCorrectAge) {
      return true;
    } else {
      if (this.form.valid && !this.isCorrectAge) {
        this.utilitiesService.showAlert(
          this.translateService.instant("¡Vaya!"),
          this.translateService.instant("Debes ser mayor de 12 años para usar esta app")
        );
        return false;
      } else {
        this.utilitiesService.showAlert(
          this.translateService.instant("¡Vaya!"),
          this.translateService.instant("Por favor, rellena todos los campos")
        );
        return false;
      }
    }
  }

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: ModalSolicitarGrupoPage,
      cssClass: "modal-eliminar",
    });
    await modal.present();
  }

  /**
   * ===============================REGISTRO CON GOOGLE============================
   * 1. Crear y/o consutar proyecto en Firebase
   * 2. Añadir la app para android y/o iOS y seguir los diferentes pasos
   * 3. Añadir hasta 3 Huellas digitales del certificado SHA (SHA-1) (debug, release y google play console)
   *    - a) keytool -list -v -keystore PATH_DEBUG_KEYSTORE -alias androiddebugkey
   *    - b) keytool -list -v -keystore PATH_KEYSTORE -alias ALIAS_NAME
   *    - c) "Integridad de la aplicación" dentro de la App de Google Play Console
   * 4. Añadir google a la app: Authentication --> Sign-in method --> Habilitar Google
   * 5. Descargar el archivo google-services.json y GoogleService-Info.plist (Y reemplazarlos o añadirlos)
   * 6. Añadir el plugin con las variables del web client id
   *  - ionic cordova plugin add cordova-plugin-googleplus --variable WEB_APPLICATION_CLIENT_ID="WEB_CLIENT_ID_FIREBASE_APP" --variable PLAY_SERVICES_VERSION=15.0.1
   *  - Introducir en el codigo siguiente también el Web client Id
   * ===============================================================================
   */

  public async loginGoogle() {
    // if (this.checkFormData()) {
    try {
      const gplusUser = await GoogleAuth.signIn();

      console.log(gplusUser);
      let user:User = {
        name: gplusUser.name,
        email: gplusUser.email,
        avatar: gplusUser.imageUrl,
        givenName: gplusUser.givenName,
        familyName: gplusUser.familyName,
      };

      await this.utilitiesService.showLoading(this.translateService.instant("Entrando"));
      this.apiService.loginGoogle(user).subscribe(
        (user: User) => {
          this.utilitiesService.dismissLoading();

          //Ahora aplicamos la cabecera devuelta a las siguientes peticiones
          this.apiService.setTokenToHeaders(user.api_token);

          //Emitimos el evento de login
          // this.events.publish("user:login"); // TODO: User not subscribing this event

          //Vamos a inicio
          this.auth.login(user.api_token);
        },
        (error) => {
          this.utilitiesService.dismissLoading();
          // this.lanzarError(error);

          console.log(error);
          console.log("*****Catch native Google*****");
          this.utilitiesService.showToast(this.translateService.instant("No se ha podido entrar con Google"));
        }
      );
    } catch (err) {
      console.log("Catch native Google", err);
      this.utilitiesService.showToast(this.translateService.instant("No se ha podido entrar con Google"));
    }
    // }
  }

  /**
   * ========================REGISTRO CON FACEBOOK===================================
   * 
   * 1. Registrar la nueva app en : https://developers.facebook.com/apps/
   * 2. Añadir el Login/Registro con Facebook, para Android y/o iOS : 
   *    - Seguir los diferentes pasos para la creación de de los hash (debug and release) (PARA ANDROID)
   *    ---- EJEMPLO GENERACIÓN DEL HASH : keytool -exportcert -alias ALIAS_O_ALIAS_DEBUG -keystore "RUTA_DEBUG_KEY_O_RELEASE_KEY" | "RUTA_OPENSSL" sha1 -binary | "RUTA_OPENSSL" base64
   * 
   * keytool -exportcert -alias androiddebugkey -keystore "C:\Users\USERNAME\.android\debug.keystore" | "PATH_TO_OPENSSL_LIBRARY\bin\openssl" sha1 -binary | "PATH_TO_OPENSSL_LIBRARY\bin\openssl" base64

   * 3. Recoger el identificador de la aplicación (en facebook developers, dentro de la app, en la zona superior izquierda)
   * 4. AÑADIR EL PLUGIN : ionic cordova plugin add cordova-plugin-facebook-connect --variable APP_ID="NUESTRA_VARIABLE" --variable APP_NAME="NOMBRE_APP" --variable FACEBOOK_HYBRID_APP_EVENTS="false" 
   * 5. Dentro del developers : Revisión de la aplicación > Permisos y funciones
   *      - Dar permiso a public_profile
   *      - Dar permiso a email
   *      - Realizar la comprobación de uso de datos (tendremos una alerta en naranja).
   * 
   * 6. MODIFICACIÓN DEL PLUGIN PARA QUE SÓLO LANZE LA WEB Y NO FALLE AL TENER INSTALADA LA APP DE FACEBOOK
   * 
   *    6.1. Ir al archivo dentro de plugins : cordova-plugin-facebook4 > src > android > ConnectPlugin.java
   *    6.2. Importar : import com.facebook.login.LoginBehavior;
   *    6.3. Buscar : LoginManager.getInstance().logInWithReadPermissions(cordova.getActivity(), permissions);
   *    6.4. Añadir justo encima de esta línea: LoginManager.getInstance().setLoginBehavior(LoginBehavior.WEB_ONLY);
   *    6.5. Esto forzará a no utilizar la app si la tuvieras instalada.
   * ===================================================================================
   */
  public registroFacebook() {}

  setLanguage(lang: string){
    this.currentLang = lang;
    this.translateService.setDefaultLang(lang);
  }
}
