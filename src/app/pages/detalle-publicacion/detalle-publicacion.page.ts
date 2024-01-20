import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ModalController, NavController, Platform } from "@ionic/angular";
import { HistoricPlace } from "src/app/models/historic-place";
import { User } from "src/app/models/User";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApplicationRef } from "@angular/core";
import { ModalReportarPublicacionPage } from "../modal-reportar-publicacion/modal-reportar-publicacion.page";
import { ModalChangePage } from "../modal-change/modal-change.page";
import { FullscreenImagePage } from '../../fullscreen-image/fullscreen-image.page';

@Component({
  selector: "app-detalle-publicacion",
  templateUrl: "./detalle-publicacion.page.html",
  styleUrls: ["./detalle-publicacion.page.scss"],
})
export class DetallePublicacionPage implements OnInit {
  public post: any;
  public comentario: any;
  public comentarios: any[] = [];
  public user: User;
  private id: any;
  private isloading: boolean = true;
  private isOwnPost: boolean = false;
  private IsIos: boolean = false;
  constructor(
    private modalController: ModalController,
    private navCtrl: NavController,
    private apiService: ApiService,
    private utilities: UtilitiesService,
    private route: ActivatedRoute,
    private appref: ApplicationRef,
    private mdlctrl: ModalController,
    private platform: Platform
  ) {}
  async openFullscreen(imageUrl: string) {
    const modal = await this.modalController.create({
      component: FullscreenImagePage,
      componentProps: {
        imageUrl: imageUrl
      }
    });
    return await modal.present();
  }
  async ngOnInit() {
    
    this.platform.is("ios") ? (this.IsIos = true) : (this.IsIos = false);

    this.id = this.route.snapshot.paramMap.get("id");
    console.log("STATE IS =>");
    console.log(history.state);

    try {
      console.log("POST IS =>");
      this.post = history.state.post;
      console.log("POST IS =>");
      console.log(this.post);

      typeof this.post == undefined
        ? console.log("state vacio")
        : console.log("NO ID");
    } catch (error) {
      typeof this.post == undefined
        ? this.getPost(this.id)
        : console.log("NO ID");
    }

    await this.getComents();

    this.user = this.post.user;
    // this.apiService.getEntity("user").subscribe((user) => {
    //   this.user = user;
    // });

    this.isOwnPost = this.post.isownpost;
  }
  async reactivatePost() {
    let params = {
      post: this.post,
    };
    await this.apiService
      .ReactivarPregunta(params)
      .toPromise()
      .then((res) => {
        if (res.status == "ok") {
          this.apiService.postChanges.next();
          this.utilities.showAlert(
            "¡Listo!",
            "Tu pregunta se ha rectivado correctamente"
          );
          this.navCtrl.navigateRoot("tabs/home");
        }
      })
      .catch((error) => {
        console.log(error);
        this.utilities.showAlert(
          "¡Vaya!",
          "Parece que ha habido un error reactivando tu pregunta"
        );
      });
  }
  getComents() {
    this.apiService
      .getEntity("comentarios", this.post.id)
      .subscribe((comentarios) => {
        this.comentarios = comentarios;
        console.log(this.comentarios);
      });
  }
  async getPost(id: any) {
    let res = await this.apiService
      .getEntity("publicaciones", this.id)
      .toPromise();

    console.log(res.message);
    console.log(res.data);

    this.post = res.data;
  }

  public back() {
    this.navCtrl.back();
  }

  public async enviarComentario() {
    console.log(this.comentario);

    let params = {
      comentario: this.comentario,
      publicacion_id: this.post.id,
    };

    // this.apiService.addEntity("comentarios", params).subscribe((comentario) => {
    //   this.comentarios.push(comentario);
    //   this.utilities.showToast("Comentario enviado");
    // });

    try {
      let res = await this.apiService
        .addEntity("comentarios", params)
        .toPromise();

      if (res.status == "ok") {
        this.comentarios.push(res.data);
        this.utilities.showToast("Comentario enviado");
        this.appref.tick();
        this.post.comentarios++;
        this.apiService.postChanges.next();
      } else {
        throw new Error(res.message + " @@TRACE => " + res.trace);
      }
    } catch (error) {
      console.log(error);

      this.utilities.showToast("Error desconocido");
    }
  }

  pulse($event) {
    let Handler =
      $event.target.classList.contains("custom") &&
      !$event.target.classList.contains("custom-out");

    Handler ? this.DeactivateIcon($event) : this.ActivateIcon($event);

    //
    // setTimeout(() => {
    //   // $event.target.classList.remove("custom");
    // }, 2000);
  }
  DeactivateIcon($event: any) {
    console.log("deactivate event=>", $event);
    $event.target.classList.remove("custom");
    $event.target.classList.toggle("custom-out");

    setTimeout(() => {
      $event.target.src = "../../../assets/icons/custom/like.svg";
      $event.target.classList.remove("custom-out");
    }, 300);

    let add = false;
    this.handleLike(add);
  }
  ActivateIcon($event: any) {
    console.log("activate");

    $event.target.src = "../../../assets/icons/custom/like-on.svg";

    $event.target.classList.toggle("custom");

    // let params = {
    //   id: this.post.id,
    //   like: true,
    // };

    let add = true;

    this.handleLike(add);
  }

  async handleLike(addOrDelete) {
    console.log("HA LLEGADO =>");
    addOrDelete == true
      ? console.log("Se añade el like")
      : console.log("Se elimina like");

    let res;
    if (addOrDelete == true) {
      console.log("te gusta la publicacion");

      res = await this.apiService
        .getEntity("megustas", this.post.id)
        .toPromise();

      console.log(res);
      this.post.isliked = true;
      this.post.megustas++;
      if (this.post.isDisliked) {
        this.post.isDisliked = false;
        if (this.post.DislikesCount > 0) {
          this.post.DislikesCount--;
        }
      }
    } else {
      let res = await this.apiService
        .deleteEntity("megustas", this.post.id)
        .toPromise();

      console.log(res);

      if (parseInt(this.post.megustas) > 0) {
        console.log("ENTRA QUITANDO MEGUSTAS");

        this.post.megustas--;
      }
      console.log("ya no te gusta la publicacion");
    }
  }

  async reportar() {
    console.log("selected report");

    const modal = await this.mdlctrl.create({
      component: ModalReportarPublicacionPage,
      cssClass: "modal-eliminar",
      componentProps: {
        id: this.post.id,
      },
    });
    await modal.present();
  }

  async proponercambio() {
    console.log("selected change");
    // console.log(publicacion_id);

    const modal = await this.mdlctrl.create({
      component: ModalChangePage,
      cssClass: "modal-eliminar",
      componentProps: {},
    });
    await modal.present();

    modal.onDidDismiss().then(async (data) => {
      console.log(data);

      if (data.data != "") {
        this.comentario = data.data;
        await this.enviarComentario().then(() => {
          this.comentario = "";
        });
      }
    });
  }

  GoToEditPost() {
    this.navCtrl.navigateForward("/editar-publicacion", {
      state: {
        post: this.post,
      },
    });
  }

  onTrueDislike() {
    console.log(this.post);
    let params = {
      publicacion: this.post.id,
    };

    this.post.isDisliked
      ? (this.post.isDisliked = false)
      : (this.post.isDisliked = true);
    this.apiService.addEntity("dislikes", params).subscribe((message) => {
      // this.utilities.showToast("Le has quitado like a la Publicación");

      console.log(message);

      if (this.post.isliked) {
        console.log("This post was liked");

        this.post.isliked = false;
        let element = document.getElementById("TargetIconIsLiked");

        let $event = {
          target: element,
        };
        this.DeactivateIcon($event);
        // if (this.post.megustas > 0) {
        //   this.post.megustas = parseInt(this.post.megustas) - 1;
        // }
      }

      if (this.post.isDisliked) {
        this.post.DislikesCount++;
      } else {
        if (this.post.DislikesCount > 0) {
          this.post.DislikesCount--;
        }
      }
    });
    console.log("POST SE QUEDA ASI", this.post);
  }
}
