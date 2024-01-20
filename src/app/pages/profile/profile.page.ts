import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { User } from "src/app/models/User";
import { FormBuilder, FormGroup } from "@angular/forms";
import { codeErrors } from "src/app/utils/utils";
import { UtilitiesService } from "src/app/services/utilities.service";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { AuthenticationService } from "src/app/services/authentication.service";
import { UserService } from "src/app/services/user.service";
import { AlertController, NavController } from "@ionic/angular";
import {
  NativeGeocoder,
  NativeGeocoderOptions,
  NativeGeocoderResult,
} from "@ionic-native/native-geocoder/ngx";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  public user: User;
  public form: FormGroup;
  public base64img: string;
  public isLoading: boolean = true;
  direccion: string;
  resultadosDireccion: NativeGeocoderResult[] = [];
  NoResult: boolean = false;
  CodigoPais: string;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private utilities: UtilitiesService,
    private camera: Camera,
    public auth: AuthenticationService,
    private uservice: UserService,
    private nav: NavController,
    private nativeGeocoder: NativeGeocoder,
    private alertController: AlertController
  ) {}

  public async ngOnInit(): Promise<void> {
    // $campos = ["description", "user_location", "user_flag"];

    this.user = await this.uservice.getUser();

    // this.apiService.getEntity("user").subscribe(
    //   (user: User) => {
    //     this.user = user;

    //     this.isLoading = false;
    //   },
    //   (error) => {
    //     this.utilities.showToast("Error obteniendo el usuario");
    //     this.isLoading = false;
    //   }
    // );

    this.form = this.formBuilder.group({
      name: [this.user.name],
      email: [this.user.email],
      avatar: [""],
      description: [this.user.description],
      user_location: [this.user.user_location],
      user_flag: [this.user.user_flag],
    });
    this.isLoading = false;
  }

  public submitForm(): void {
    console.log(this.form.value);

    this.apiService.updateUser(this.form.value).subscribe(
      async (userresponse: User) => {
        await this.uservice.setUser(userresponse);

        this.utilities.showToast("Usuario actualizado correctamente");
      },
      (error) => {
        this.utilities.showToast(codeErrors(error));
      }
    );
  }

  /**
   * Cambiar imagen de perfil
   */
  public adjuntarImagen(): void {
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
    };
    this.camera
      .getPicture(options)
      .then((urlFoto) => {
        this.base64img = "data:image/jpeg;base64," + urlFoto;
        this.user.avatar = this.base64img;
        this.form.patchValue({ avatar: this.base64img });

        console.log(urlFoto);
      })
      .catch((error) => {
        console.log(error);

        this.utilities.showAlert("Error al obtener imagen", error);
      });
  }

  /**
   * Handle the selected direction and hands it to geocoder
   */
  GetDireccion() {
    this.NoResult = false;
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5,
    };
    console.log(this.direccion);

    this.nativeGeocoder
      .forwardGeocode(this.direccion, options)
      .then((response) => {
        console.log("RESPONSE=>");

        console.log(response);

        this.resultadosDireccion = response;
      })
      .catch((err) => {
        console.log(err);

        this.resultadosDireccion = [];
        this.NoResult = true;
      });

    if (this.resultadosDireccion.length > 1) {
      this.NoResult = true;
    }
  }

  back() {
    this.nav.back();
  }

  /**
   * Sets the selected place on variable
   *
   * @param r :selected place
   */
  SelectPlace(r: NativeGeocoderResult) {
    this.resultadosDireccion = [];
    console.log("SELECT PLACE");
    console.log(r);
    let loc = r.areasOfInterest[0] + ", " + r.countryName;
    let flag = r.countryCode;
    this.setFormValues("user_location", loc);
    this.setFormValues("user_flag", flag);
    console.log("VALUES OF FORM");
    console.log(this.form.value);
  }
  /**
   * Sets the vaule on control
   *
   * @param controlname selected Control
   * @param controlvalue :selected value
   */
  setFormValues(controlname, controlvalue) {
    // this.form.setValue(controlname,controlvalue);
    this.form.get(controlname).setValue(controlvalue);
  }

  async ModalDeleteUser() {
    const alert = await this.alertController.create({
      header: "Aviso",
      message:
        "Estas a punto de eliminar tu cuenta. Esta accion no se puede deshacer",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {},
        },
        {
          text: "Continuar",
          handler: () => {
            this.deleteUser();
          },
        },
      ],
    });
    await alert.present();
  }

  deleteUser() {
    let params = {
      user_id: this.user.id,
    };

    this.apiService
      .deleteUser(params)
      .toPromise()
      .then((res: any) => {
        this.auth.logout();
        this.utilities.showAlert("¡Listo!", "" + res.message);
      })
      .catch((err) => {
        this.utilities.showAlert(
          "¡Vaya!",
          "" + err.message + ", pruebe mas tarde"
        );
      });
  }
}
