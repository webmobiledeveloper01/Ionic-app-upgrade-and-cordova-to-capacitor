import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ModalReportarPublicacionPage } from "../modal-reportar-publicacion/modal-reportar-publicacion.page";
import { ModalSharePage } from "../modal-share/modal-share.page";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";

@Component({
  selector: "app-muro-proximidad",
  templateUrl: "./muro-proximidad.page.html",
  styleUrls: ["./muro-proximidad.page.scss"],
})
export class MuroProximidadPage implements OnInit {
  IsLoading: boolean = false;
  ObjetoPost: any;
  postList = [];
  near: string = "";
  Void: Boolean;
  user: any;

  constructor(
    private nav: NavController,
    private api: ApiService,
    private utils: UtilitiesService,
    private socialSharing: SocialSharing,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    // class ObjectPosts {
    //   posts: [] = [];
    //   near: string = "";
    //   count: Number = 0;
    // }

    if (this.IfObjectNotNull()) {
      this.Void == false;
      this.postList = this.ObjetoPost.posts;
      this.near = this.ObjetoPost.near;
    } else {
      this.Void = true;
    }
  }

  IfObjectNotNull() {
    if (history.state.ObjetoPost != undefined) {
      if (history.state.ObjetoPost.posts.length > 0) {
        this.ObjetoPost = history.state.ObjetoPost;
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  back() {
    this.nav.back();
  }

  HandlePostLike(publicacion) {
    this.api.getEntity("megustas", publicacion.id).subscribe((message) => {
      this.utils.showToast("Le has dado Me gusta a la Publicación");
      publicacion.isliked = true;
      publicacion.megustas = parseInt(publicacion.megustas) + 1;
    });
  }
  HandlePostDislike(publicacion) {
    this.api.getEntity("megustas", publicacion.id).subscribe((message) => {
      this.utils.showToast("Le has quitado like a la Publicación");
      publicacion.isliked = false;
      publicacion.megustas = parseInt(publicacion.megustas) - 1;
    });
  }
  HandlePostGoDetails(post) {
    this.nav.navigateForward("/detalle-publicacion/" + post.id, {
      state: {
        post: post,
      },
    });
  }

  async HandlePostReport(publicacion_id) {
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
  async HandlePostShare(post) {
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
        this.shareApp(data.data.image);
      } else {
        this.ShareOnGroup(data.data).then(() => {
          console.log("Shared with group");
          console.log(data);
        });
      }
    });
  }
  async ShareOnGroup(data) {
    try {
      let res = await this.api
        .addEntity("chanelposts", data)
        .toPromise()
        .catch((error) => {
          console.log(error);
          throw new error(error);
        });

      res.status === "ok"
        ? this.initShareProcess(res)
        : this.ProblemWithShare(res);
    } catch (error) {
      this.ProblemWithShare(error);
    }
  }
  ProblemWithShare(res: any) {
    this.utils.showAlert(
      "Hubo un problema al intentar compartir",
      "Intente de nuevo mas tarde"
    );
    console.error(res);
  }

  async initShareProcess(res: any) {
    console.log("INIT SHARE");
    console.log(res.data.chanel_id);

    this.api.groupChanges.next();
    await this.getGrupo(res.data.chanel_id).then((chanel) => {
      this.nav.navigateForward("grupo", {
        state: {
          grupo: chanel,
        },
      });
    });
  }
  async getGrupo(chanel_id: any) {
    let res = await this.api.getEntity("Chanels", chanel_id).toPromise();

    return res.data;

    // console.log("EL CANAL es =>");
    // console.log(res);
  }
  public async shareApp(imagen) {
    // console.log("CLICKED");
    // console.log(id);

    // Image:
    //   "https://timemapp.davidtovar.dev/storage/CtD5XZr2MZ6RVTvMc0uSuzRjA0v86MTmEuHt2v5h.png",
    // let message = "Test Plugin SocialSharing"; // not supported on some apps (Facebook, Instagram)
    // // subject: "Sujeto", // fi. for email
    // let chooserTitle = "Escoge la app para compartir"; // Android only, you can override the default share sheet title
    // let url =
    //   "https://timemapp.davidtovar.dev/storage/special-events/May2022/rlx6e6ShXQhpqylUDLYl.png";

    let files = imagen;
    // let files ="timemapp.davidtovar.dev/storage/CtD5XZr2MZ6RVTvMc0uSuzRjA0v86MTmEuHt2v5h.png";
    let message = "¡ Mira mi publicacion de TimeApp !";

    var options = {
      message: message, // not supported on some apps (Facebook, Instagram)
      subject: "Sujeto", // fi. for email
      chooserTitle: "Escoge la app para compartir", // Android only, you can override the default share sheet title
      //url: 'https://timemapp.davidtovar.dev/storage/special-events/May2022/rlx6e6ShXQhpqylUDLYl.png',
      files: [imagen],
    };

    this.socialSharing.shareWithOptions(options).then(
      (result) => {
        console.log("plugin result", result);
      },
      (error) => {
        console.log("plugin error", error);
      }
    );
  }

  HandlePostGoProfile(usuario) {
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
}
