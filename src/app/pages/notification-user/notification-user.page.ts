import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Notification } from "src/app/models/Notification";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ModalInvitacionGrupoPage } from "../modal-invitacion-grupo/modal-invitacion-grupo.page";

@Component({
  selector: "app-notification-user",
  templateUrl: "./notification-user.page.html",
  styleUrls: ["./notification-user.page.scss"],
standalone: false,
})
export class NotificationUserPage implements OnInit {
  public notificaciones: Notification[] = [];
  activated: boolean = false;
  Wrap: HTMLIonGridElement;
  block_notification_comentario: boolean;
  block_notification_grupo: boolean;
  block_notification_like: boolean;
  block_notification_mensaje: boolean;
  block_notification_seguidor: boolean;
  IsLoading: boolean = true;
  isVoid: boolean = false;

  constructor(
    private apiService: ApiService,
    private utils: UtilitiesService,
    private mcontrol: ModalController
  ) {}

  ngOnInit() {
    this.getNotifications().then(async () => {
      await this.GetOptions().then(() => {
        this.IsLoading = false;
      });
    });
  }

  //>---------------------------------METODOS GET-----------------------------------<
  async GetOptions() {
    let res = await this.apiService.getEntity("not-settings", 1).toPromise();

    console.log("CONFIG =>");

    console.log(res);

    if (res.status != "void") {
      res.data.block_notification_comentario == 1
        ? (this.block_notification_comentario = true)
        : false;
      res.data.block_notification_grupo == 1
        ? (this.block_notification_grupo = true)
        : false;
      res.data.block_notification_like == 1
        ? (this.block_notification_like = true)
        : false;
      res.data.block_notification_mensaje == 1
        ? (this.block_notification_mensaje = true)
        : false;
      res.data.block_notification_seguidor == 1
        ? (this.block_notification_seguidor = true)
        : false;
    }
  }

  async getNotifications() {
    console.log("notifications");

    let res = await this.apiService.getEntity("news", 1).toPromise();
    console.log("RESPUESTA => ");

    console.log(res);

    if (res.status === "ok") {
      this.notificaciones = res.data;
      if (this.notificaciones.length <= 0) {
        this.isVoid = true;
      }
    } else {
      this.notificaciones = null;
      this.isVoid = true;
      // console.log(res.message);
    }
  }

  async DisplayInvitations($event): Promise<any> {
    var Not_id = $event;
    console.log(Not_id);

    const modal = await this.mcontrol.create({
      component: ModalInvitacionGrupoPage,
      cssClass: "modal-custom",
      componentProps: {
        id: $event.id,
      },
    });
    await modal.present();

    modal.onDidDismiss().then((data) => {
      console.log("Modal-data =>");

      console.log(data);

      if (data.data.accepted) {
        this.AddUserToGroup(data.data.id);
      } else {
        console.log("no");
      }

      this.deleteNotification($event.not_id);
    });
  }

  async DisplayRequest($event): Promise<any> {
    var Not_id = $event;
    console.log(Not_id);

    const modal = await this.mcontrol.create({
      component: ModalInvitacionGrupoPage,
      cssClass: "modal-custom",
      componentProps: {
        id: $event.id,
      },
    });
    await modal.present();

    modal.onDidDismiss().then((data) => {
      console.log("Modal-data =>");

      console.log(data);

      if (data.data.accepted) {
        this.AddUserToGroupFromRequest(data.data.id);
      } else {
        console.log("no");
      }

      this.deleteNotification($event.not_id);
    });
  }

  async AddUserToGroup(id) {
    console.log("si ");

    let params = {
      id: id,
      isInvitation:true,
    };

    console.log("PARAMS=>");
    console.log(params);

    let res = await this.apiService
      .addEntity("userchanels", params)
      .toPromise();

    console.log(res);

    this.apiService.groupChanges.next("");
  }

  async AddUserToGroupFromRequest(id) {
    console.log("si ");

    let params = {
      id: id,
      isInvitation:false,
    };

    console.log("PARAMS=>");
    console.log(params);

    let res = await this.apiService
      .addEntity("userchanels", params)
      .toPromise();

    console.log(res);

    this.apiService.groupChanges.next("");
  }


  toggleConfig($event) {
    // console.log("Clicked");

    this.ActivateConfig($event);
  }

  ActivateConfig($event) {
    this.activated = !this.activated;
    let element = document.getElementsByClassName("inner-wrap")[0];

    if (this.activated) {
      $event.target.classList.toggle("activated");

      this.fadeIn(element);

      if ($event.target.classList.contains("deactivate")) {
        $event.target.classList.remove("deactivate");
      }
    } else {
      if ($event.target.classList.contains("activated")) {
        $event.target.classList.remove("activated");
      }
      this.fade(element);
      $event.target.classList.toggle("deactivate");
    }
    // console.log("State= ");
    // console.log(this.activated);
    // console.log("Classlist= ");

    // console.log($event.target.classList);
  }

  async deleteNotification($event) {
    console.log("ID IS =");
    console.log($event);

    let element = document.getElementById($event);

    // console.log(element);

    this.fade(element);
    let params = {
      id: $event,
    };

    let res = await this.apiService.updateEntity("news", 1, params).toPromise();

    console.log("Response =>");

    console.log(res);
    this.apiService.notificationChanges.next("");
  }

  fade(element) {
    var op = 1; // initial opacity
    var timer = setInterval(function () {
      if (op <= 0.1) {
        clearInterval(timer);
        element.style.display = "none";
      }
      element.style.opacity = op + "";
      element.style.filter = "alpha(opacity=" + op * 100 + ")";
      op -= op * 0.5;
    }, 100);
  }

  fadeIn(element) {
    var op = 1; // initial opacity
    var timer = setInterval(function () {
      if (op > 0.99) {
        clearInterval(timer);
        element.style.display = "block";
      }
      element.style.opacity = op + "";
      element.style.filter = "alpha(opacity=" + op * 100 + ")";
      op += op * 0.1;
    }, 300);
  }

  async savePreferences() {
    let interruptores = document.getElementsByTagName("ion-toggle");

    let options = [];

    for (let x = 0; x < interruptores.length; x++) {
      const element = interruptores[x];
      options.push(element.checked);
    }

    console.log("OPTIONS");

    console.log(options);

    this.utils.showLoading("Guardando sus preferencias...");
    let res = await this.apiService
      .updateEntity("not-settings", 1, options)
      .toPromise()
      .then((res) => {
        console.log(res);
        this.utils.dismissLoading();
        this.utils.showAlert(
          "¡Listo!",
          "Sus preferencias se guardaron correctamente"
        );
      });
  }
}
