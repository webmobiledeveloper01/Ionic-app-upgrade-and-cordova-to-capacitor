import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { MenuController, ModalController, NavController } from "@ionic/angular";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ModalReportarPage } from "../modal-reportar/modal-reportar.page";
import { ModalReportarPublicacionPage } from "../modal-reportar-publicacion/modal-reportar-publicacion.page";
import { User } from "src/app/models/User";
import { ModalBannersPage } from "../modal-banners/modal-banners.page";
import { Share } from "@capacitor/share";
import { Banner } from "src/app/models/Banner";
import { ChangeDetectorRef } from "@angular/core";
import { ModalInvitacionGrupoPage } from "../modal-invitacion-grupo/modal-invitacion-grupo.page";
import { ModalSharePage } from "../modal-share/modal-share.page";
import { AuthenticationService } from "src/app/services/authentication.service";
import { DomSanitizer } from "@angular/platform-browser";

import { Browser} from '@capacitor/browser';
import { TranslateService } from "@ngx-translate/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  public publicaciones: any[] = [];
  public user: User;
  public banners: any;
  public megusta: boolean;
  public BannerIndex: number = 0;
  public BannerIndexSum = 0;
  public invitations: any[] = [];

  // Banners :Banner[]=[];
  public BannerIsVisible: boolean = false;
  public isLoading: boolean = true;
  public ShouldIncrement: boolean = false;

  constructor(
    private apiService: ApiService,
    private menuCtrl: MenuController,
    private utilities: UtilitiesService,
    private modalCtrl: ModalController,
    private navct: NavController,
    private cd: ChangeDetectorRef,
    private nav: NavController,
    private auth: AuthenticationService,
    public sanitizer: DomSanitizer,
    private translateService: TranslateService
    // HotFix: private Browser: InAppBrowser Capacitor Browser ** DONE ** 
  ) {}

  public async ngOnInit() {
    this.menuCtrl.enable(true);
    await this.Innitpage();
    this.apiService.postChanges.subscribe(async () => {
      this.isLoading = true;

      await this.Innitpage();
    });
    this.apiService.userChanges.subscribe(async () => {
      this.isLoading = true;

      await this.Innitpage();
    });
    // this.cdref.detectChanges();
  }
  async Innitpage() {
    await this.GetPublicaciones().then(() => {
      this.getuser().then(async () => {
        await this.GetPublicaciones();
        await this.getBanners();
        // await this.GetInvitations();

        console.log("BANNERS=>");
        console.log(this.banners);

        // this.user = user;
        if (this.user.primera_vez == 1) {
          // this.presentModal().then(() => {
          console.log("Primera vez");

          this.isLoading = false;
          // });
        } else {
          this.isLoading = false;
        }
      });
    });
  }

  async ionViewWillEnter() {
    // await this.getuser();
    // if (this.user.primera_vez == 1) {
    //   await this.presentModal();
    //     const modal = await this.modalCtrl.create({
    //       component: ModalBannersPage,
    //       cssClass: "modal-eliminar",
    //       componentProps: {},
    //     });
    //     await modal.present();
    // }
  }

  async openShare(post) {
    // console.log("Al open llega");
    // console.log(id);

    const modal = await this.modalCtrl.create({
      component: ModalSharePage,
      cssClass: "modal-compartir",
      componentProps: {
        post: post,
      },
    });
    await modal.present();

    modal.onDidDismiss().then((data) => {
      console.log(data);

      if (data.data.Ongroup == false) {
        this.shareApp(data.data.image, data.data.post);
      } else {
        this.ShareOnGroup(data.data).then(() => {
          console.log("Shared with group");
          console.log(data);
        });
      }
    });
  }

  async ShareOnGroup(data) {
    let res = await this.apiService.addEntity("chanelposts", data).toPromise();

    try {
      res.status === "ok"
        ? this.initShareProcess(res)
        : this.ProblemWithShare(res);
    } catch (error) {
      this.ProblemWithShare(error);
    }
  }

  ProblemWithShare(res: any) {
    this.utilities.showAlert(
      this.translateService.instant("Hubo un problema al intentar compartir"),
      this.translateService.instant("Intente de nuevo mas tarde")
    );
    console.error(res);
  }

  async initShareProcess(res: any) {
    console.log("INIT SHARE");
    console.log(res.data.chanel_id);

    this.apiService.groupChanges.next("");
    await this.getGrupo(res.data.chanel_id).then((chanel) => {
      this.navct.navigateForward("grupo", {
        state: {
          grupo: chanel,
        },
      });
    });
  }

  async getGrupo(chanel_id: any) {
    let res = await this.apiService.getEntity("Chanels", chanel_id).toPromise();

    return res.data;

    // console.log("EL CANAL es =>");
    // console.log(res);
  }

  //   //   const modal = await this.modalCtrl.create({
  //   //     component: ModalBannersPage,
  //   //     cssClass: "modal-eliminar",
  //   //     componentProps: {},
  //   //   });
  //   //   await modal.present();
  async GetPublicaciones() {
    this.apiService.getEntity("publicaciones").subscribe((publicaciones) => {
      this.publicaciones = publicaciones;
      console.log("PUBLICACIONES");

      console.log(this.publicaciones);
    });
  }

  async getBanners() {
    this.banners = await this.apiService.getEntity("banners").toPromise();
    // this.banners = this.processImages(this.banners);
    // this.banners = this.banners;

    console.log("BANNERS");
    console.log(this.banners);

    // this.cd.detectChanges();
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ModalBannersPage,
      cssClass: "modal-eliminar",
      componentProps: {},
    });
    await modal.present();
  }

  async getuser() {
    this.user = await this.apiService.getEntity("user").toPromise();
  }

  GoDetails(post) {
    this.navct.navigateForward("/detalle-publicacion/" + post.id, {
      state: {
        post: post,
      },
    });
  }

  public async shareApp(imagen, post) {
    // console.log("CLICKED");
    console.log(post);

    // let url = "https://timemapp.davidtovar.dev/detalle-publicacion";


    let url="https://timemapp.davidtovar.dev/detalle-de-publicacion";


    // let files = imagen;
    let files = environment.domainUrl + "storage/Y7rNM3yGx5SCqoYJPzKxvRp8G5rBnySNaf7nPSX1.png";

    let message = "¡Mira mi publicacion de TimeMapp!";

    var options = {
      message: message, // not supported on some apps (Facebook, Instagram)
      subject: this.translateService.instant("Sujeto"), // fi. for email
      chooserTitle: this.translateService.instant("Escoge la app para compartir"), // Android only, you can override the default share sheet title
      url: url,
      files: [files],
    };

    Share.share(options).then(
      (result) => {
        console.log("plugin result", result);
      },
      (error) => {
        console.log("plugin error", error);
      }
    );
  }

  increaseIndex() {
    this.BannerIndex + 1 <= this.banners.length
      ? this.BannerIndex++
      : this.BannerIndex == 0;
  }

  public megustas(publicacion) {
    console.log("POST ERA ASI", publicacion);

    this.apiService
      .getEntity("megustas", publicacion.id)
      .subscribe((message) => {
        this.utilities.showToast(this.translateService.instant("Le has dado Me gusta a la Publicación"));
        if (publicacion.isDisliked) {
          publicacion.isDisliked = false;
          if (publicacion.DislikesCount > 0) {
            publicacion.DislikesCount = parseInt(publicacion.DislikesCount) - 1;
          }
        }
        if (!publicacion.isliked) {
          publicacion.isliked = true;
        }
        publicacion.megustas = parseInt(publicacion.megustas) + 1;
      });
    console.log("POST SE QUEDA ASI", publicacion);
  }

  async IsVisited(id) {
    let params = {
      id: id,
    };
    console.log(id);
    let r = await this.apiService
      .updateEntity("banners-stats", 1, params)
      .toPromise();
    console.log(r);
    this.utilities.showAlert(
      this.translateService.instant("¡Gracias por tu valoracion!"),
      this.translateService.instant("Tu gesto ayuda a los creadores")
    );
  }

  public nomegustas(publicacion) {
    this.apiService
      .getEntity("megustas", publicacion.id)
      .subscribe((message) => {
        this.utilities.showToast(this.translateService.instant("Le has quitado like a la Publicación"));
        publicacion.isliked = false;
        publicacion.megustas = parseInt(publicacion.megustas) - 1;
      });
  }

  async reportar(publicacion_id) {
    console.log("selected");
    console.log(publicacion_id);

    const modal = await this.modalCtrl.create({
      component: ModalReportarPublicacionPage,
      cssClass: "modal-eliminar",
      componentProps: {
        id: publicacion_id,
      },
    });
    await modal.present();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalBannersPage,
      cssClass: "modal-eliminar",
      componentProps: {},
    });
    await modal.present();
  }
  async doRefresh(event) {
    await this.Innitpage().then(() => {
      event.target.complete();
    });
  }
  public seguir(publicacion) {
    let params = {
      seguido_id: publicacion.usuario.id,
    };

    this.apiService.addEntity("seguidores", params).subscribe((seguido) => {
      console.log(seguido);
      this.setUserState(publicacion.usuario.id, true);
    });
  }

  unfollow(publicacion) {
    this.apiService
      .deleteEntity("seguidores", publicacion.usuario.id)
      .subscribe((seguido) => {
        console.log(seguido);
        this.setUserState(publicacion.usuario.id, false);
      });
  }

  /**
   * Recibe un id de usuario y un estado, y setea todos los estados de seguimiento de usuarios dentro de
   * publicaciones al estado seleccionado
   *
   * @param id
   * Id del usuario en cuestion
   * @param follow
   * true si se sigue, false si es unfollow
   */
  setUserState(id: any, follow) {
    this.publicaciones.forEach((element) => {
      if (element.usuario.id == id) {
        element.usuario.seguidor = follow;
        console.log("Antes");

        this.setFollowStatus(element.usuario, follow);
        console.log("Ahora");
        console.log(element.usuario.FollowsCurrentUser);
      }
    });
  }

  setFollowStatus(usuario: User, follow: boolean) {
    console.log(usuario.FollowsCurrentUser);

    switch (usuario.FollowsCurrentUser) {
      case 1:
        //current user is followed by this user.

        !follow
          ? console.log("case 1 and follow is false")
          : (usuario.FollowsCurrentUser = 2);

        break;

      case 2:
        //They are mutuals.
        !follow
          ? (usuario.FollowsCurrentUser = 1)
          : console.log("case 2 and follow is true");

        break;
      case 3:
        //only current user follows this user,
        !follow
          ? (usuario.FollowsCurrentUser = 0)
          : console.log("case 3 and follow is true");

        break;
      case 0:
        //They dont follow at all, do nothing

        !follow
          ? console.log("case 0 and follow is false")
          : (usuario.FollowsCurrentUser = 3);
        break;
    }
  }

  /**
   * Recibe la url del bannner y abre el webview
   *
   */

  OpenWeb($event) {
    console.log($event);
    // HotFix:  Capacitor Browser ** DONE **
    // let options: InAppBrowserOptions = {
    //   location: "no", //Or 'no'
    //   hidden: "yes", //Or  'yes' //clearcache : 'yes',
    //   //clearsessioncache : 'yes',
    //   zoom: "yes", //Android only ,shows browser zoom controls
    //   hardwareback: "yes",
    //   mediaPlaybackRequiresUserAction: "no",
    //   shouldPauseOnSuspend: "no", //Android only
    //   closebuttoncaption: "Cerrar", //iOS only
    //   disallowoverscroll: "no", //iOS only
    //   toolbar: "yes", //iOS only
    //   enableViewportScale: "no", //iOS only
    //   allowInlineMediaPlayback: "no", //iOS only
    //   fullscreen: "yes", //Windows only
    //   hideurlbar: "yes",
    //   hidenavigationbuttons: "yes",
    // };

    Browser.open({ url: $event });
  }

  /**
   * Recibe un usuario y redirige a su perfil
   *
   * @param usuario
   */
  GoToProfile(usuario) {
    // console.log(usuario);

    if (usuario.id == this.user.id) {
      console.log("VAS A TU PERFIL?");
    } else {
      this.nav.navigateRoot("/perfil-publico", {
        state: {
          userProfile: usuario,
        },
      });
    }
  }

  onTrueDislike(publicacion) {
    console.log(publicacion);
    let params = {
      publicacion_id: publicacion.id,
    };

    publicacion.isDisliked
      ? (publicacion.isDisliked = false)
      : (publicacion.isDisliked = true);
    this.apiService.addEntity("dislikes", params).subscribe((message) => {
      // this.utilities.showToast("Le has quitado like a la Publicación");

      console.log(message);

      if ((publicacion.isliked = true)) {
        publicacion.isliked = false;

        if (publicacion.megustas > 0) {
          publicacion.megustas = parseInt(publicacion.megustas) - 1;
        }
      }

      if (publicacion.isDisliked) {
        publicacion.DislikesCount++;
      } else {
        if (publicacion.DislikesCount > 0) {
          publicacion.DislikesCount--;
        }
      }
    });
    console.log("POST SE QUEDA ASI", publicacion);
  }
}
