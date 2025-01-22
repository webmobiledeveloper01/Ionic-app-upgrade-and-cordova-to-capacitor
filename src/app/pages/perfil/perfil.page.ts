import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { User } from "src/app/models/User";
import { ApiService } from "src/app/services/api.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ModalEliminarpublicacionPage } from "../modal-eliminarpublicacion/modal-eliminarpublicacion.page";
import { Camera, CameraOptions, CameraResultType, CameraSource } from "@capacitor/camera";
import { FormBuilder, FormGroup } from "@angular/forms";
import { codeErrors } from "src/app/utils/utils";
import { ModalBannersPage } from "../modal-banners/modal-banners.page";
import { yearContainer } from "src/app/models/YearContainer";
import { UserService } from "src/app/services/user.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.page.html",
  styleUrls: ["./perfil.page.scss"],
standalone: false,
})
export class PerfilPage implements OnInit {
  public verPublicacion: boolean = true;
  public user: User;
  public base64img: any;
  public form: FormGroup;
  public posts: [] = [];
  lastpost;
  lastContainer;
  isLoading = true;
  public years: yearContainer[];
  ThereIsPosts: boolean = true;

  constructor(
    private navCtrl: NavController,
    private modalController: ModalController,
    private apiService: ApiService,
    public auth: AuthenticationService,
    private utilities: UtilitiesService,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private uservice: UserService,
    private translateService: TranslateService
  ) {}

  async ngOnInit() {
    // await this.utilities.showLoading();

    this.apiService.postChanges.subscribe(async () => {
      this.isLoading = true;

      this.resetGlobalVariables();

      await this.innitPage().then(() => {
        // this.utilities.dismissLoading();

        this.isLoading = false;
      });
    });

    this.apiService.userChanges.subscribe(async (user) => {
      console.log("recibido user en profile");
      console.log(user);

      this.user = user;
    });

    this.form = this.formBuilder.group({
      avatar: [""],
    });

    await this.innitPage().then(() => {
      // this.utilities.dismissLoading();
      this.isLoading = false;
    });
  }
  resetGlobalVariables() {
    if (this.years != undefined) {
      this.years = [];
    }
    if (this.lastpost != undefined) {
      this.lastpost = undefined;
    }
    if (this.lastContainer != undefined) {
      this.lastContainer = undefined;
    }
  }

  async innitPage() {
    await this.GetUser().then(async () => {
      await this.GetPost();
    });
  }

  getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  GoDetails(post) {
    this.navCtrl.navigateForward("/detalle-publicacion/" + post.id, {
      state: {
        post: post,
      },
    });
  }

  async GetUser() {
    this.user = await this.uservice.getUser();
    // let user = await this.apiService.getEntity("user").toPromise();
    // this.user = user;
    // console.log("USER IS =>");

    // console.log(this.user);
  }

  async GetPost() {
    let res = await this.apiService.getUserPost(this.user.id).toPromise();

    console.log("POSTS =>");

    console.log(res);

    this.posts = res.data;

    if (this.posts.length <= 0) {
      this.ThereIsPosts = false;
    } else {
      this.CreateYearBlocks();
    }
  }

  async CreateYearBlocks() {
    // REFACTORIZAR

    this.posts.forEach((post, index) => {
      this.years == undefined ? (this.years = []) : this.years;
      console.log(this.years);
      console.log("POST IS");
      console.log(post);
      console.log("index");

      console.log(index);

      let d = new Date((post as any).fecha);

      if (this.lastpost != undefined && this.lastpost == d.getFullYear()) {
        console.log(this.lastContainer.posts);
        this.lastContainer.posts.push(post);
        this.lastContainer.postCount++;

        if (index == this.posts.length - 1) {
          this.lastContainer.postCount = this.lastContainer.posts.length;
          this.years.push(this.lastContainer);
        }
      } else {
        if (this.lastContainer != undefined) {
          this.lastContainer.postCount = this.lastContainer.posts.length;
        }
        console.log("EL ultimo container es=>");
        console.log(this.lastContainer);

        console.log("YEARS ERA=>");

        console.log(this.years);
        if (this.lastContainer != undefined) {
          this.years.push(this.lastContainer);
        }
        let d = new Date((post as any).fecha);
        let yearC: yearContainer = {
          id: index,
          year: "" + d.getFullYear(),
          posts: [],
          postCount: 0,
          postPosition: 1,
        };

        yearC.posts.push(post);
        this.lastContainer = yearC;
        this.lastpost = d.getFullYear();

        if (index == this.posts.length - 1) {
          this.lastContainer.postCount = this.lastContainer.posts.length;
          this.years.push(this.lastContainer);
        }
      }
    });

    console.log("Los containers son =>");

    console.log(this.years);

    // if (this.posts.length < 2) {
    //   console.log("Solo hay un post asi que se añade aqui");
    //   this.lastContainer.postCount = 1;
    //   this.years.push(this.lastContainer);
    // }
  }

  public back() {
    this.navCtrl.back();
  }

  out() {
    this.auth.logout();
  }




  GoToFollowers(){
    this.navCtrl.navigateForward("/seguidores",{
   state: {
   Followers : true,
     },
     });
    }
    GoToSponsor() {
      this.navCtrl.navigateForward("pago");
    }

GoToFollowing(){
 this.navCtrl.navigateForward("/seguidores",{
state: {
Followers : false,
  },
  });
 }

  async sliderChanges($event, post) {


    let res = await $event.target.getActiveIndex();
    console.log(res);

    post.postPosition = res + 1;

  }

  async borrarPublicacion(id) {
    const modal = await this.modalController.create({
      component: ModalEliminarpublicacionPage,
      cssClass: "modal-eliminar",
      componentProps: {
        idPublicacion: id,
      },
    });
    modal.onDidDismiss().then(async (dataReturned) => {
      console.log(dataReturned);

      if (dataReturned.data == true) {
        await this.deletePost(id);
        this.apiService.postChanges.next("");
      }
    });
    await modal.present();
  }

  async deletePost(id: any) {
    try {
      let res = await this.apiService
        .deleteEntity("publicaciones", id)
        .toPromise();

      console.log(res);
    } catch (error) {
      this.utilities.showToast(
        this.translateService.instant("Ha ocurrido un error en el servidor, inténtelo mas tarde")

      );
      console.log(error);
    }
  }

  iraPago() {
    this.navCtrl.navigateForward("/pago");
  }

  irPanel() {}

  cancelarSuscripcion() {
    this.apiService.cancelar().subscribe((user: User) => {
      this.user = user;
      this.utilities.showToast(this.translateService.instant("Suscripción Cancelada"));
    });
  }

  public adjuntarImagen(): void {
    const options: CameraOptions = {
      quality: 100,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      width: 1920,
      height: 1080,
      allowEditing: true,
      correctOrientation: true,
    };
    Camera
      .getPhoto(options)
      .then((urlFoto) => {
        this.base64img = "data:image/jpeg;base64," + urlFoto;
        this.form.patchValue({ avatar: this.base64img });

        this.apiService.updateUser(this.form.value).subscribe(
          (user: User) => {
            this.user = user;
            this.utilities.showToast(this.translateService.instant("Usuario actualizado correctamente"));
          },
          (error) => {
            this.utilities.showToast(codeErrors(error));
          }
        );
        console.log(urlFoto);
        // this.user.avatar = this.base64img;
        this.UpdateUser();
      })
      .catch((error) => {
        this.utilities.showAlert(this.translateService.instant("Error al obtener imagen"), error);
      });
  }
  async UpdateUser() {
    console.log("UPDATE=>");

    let res = await this.apiService.updateUser(this.user).toPromise();

    if (!(res == undefined)) {
      console.log(res);
      this.user = res;
    } else {
      console.log("Return nothing");
    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalBannersPage,
      cssClass: "modal-eliminar",
      componentProps: {},
    });
    await modal.present();
  }
}
