import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { Grupos } from "src/app/models/Grupos";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ModalInvitacionGrupoPage } from "../modal-invitacion-grupo/modal-invitacion-grupo.page";
import { ModalInvitePage } from "../modal-invite/modal-invite.page";

@Component({
  selector: "app-grupo",
  templateUrl: "./grupo.page.html",
  styleUrls: ["./grupo.page.scss"],
})
export class GrupoPage implements OnInit {
  public grupo: any;
  IsVisible: boolean = false;
  InvitableUsers;
  NoFriends: boolean = false;
  inviteUsersList: number[] = [];
  isLoading: boolean = true;
  inviteObjectsList: any[] = [];
  Post: any[] = [];
  TriedToJoin = false;

  constructor(
    private api: ApiService,
    private mcontrol: ModalController,
    private utils: UtilitiesService,
    private nav: NavController
  ) {}

  async ngOnInit() {
    this.api.groupChanges.subscribe(() => {
      this.innitData().then(() => {
        this.isLoading = false;
      });
    });
    

    this.innitData().then(() => {
      this.isLoading = false;
    });

    this.api.inviteChanges.subscribe(async (Users) => {
      Users.forEach((element) => {
        this.grupo.users_list.push(element);
      });

      this.filterUsers();
    });
  }

  async innitData() {
    this.grupo = history.state.grupo;
    this.SetVisibility();
    await this.getPost();
    await this.getInvitableUsers();
  }

  /**
   *
   * @param $event
   */
  public back() {
    this.nav.navigateBack("/tabs/canales-grupos");
  }
  async handleLike($event) {
    console.log("HA LLEGADO =>");

    console.log($event);
    let res;
    if ($event.like) {
      console.log("te gusta la publicacion");

      res = await this.api.getEntity("megustas", $event.id).toPromise();

      console.log(res);
    } else {
      let params = {
        id: $event.id,
      };

      res = await this.api.deleteEntity("megustas", $event.id).toPromise();

      console.log(res);
      console.log("ya no te gusta la publicacion");
    }
  }
  async getPost() {
    console.log("GRUPO");
    console.log(this.grupo);
    try {
      let res = await this.api
        .getEntity("chanelposts", this.grupo.id)
        .toPromise();

      this.Post = res.data;
    } catch (error) {
      console.log(error);
    }

    console.log("POST");

    console.log(this.Post);
  }

  async invitar() {
    await this.presentModal();
  }

  async presentModal() {
    const modal = await this.mcontrol.create({
      component: ModalInvitePage,
      cssClass: "modal-eliminar",
      componentProps: {
        invited: this.InvitableUsers,
      },
    });
    await modal.present();
    modal.onDidDismiss().then(async (data: any) => {
      var modalData = data.data.inviteList;
      var modalObjects = data.data.inviteObjects;
      if (modalData.length > 0) {
        console.log("se llama al invitar");
        this.inviteUsersList = modalData;
        this.inviteObjectsList = modalObjects;
        await this.SendInvitations();
      } else {
        console.log("no se llama al invitar");
      }
    });
  }

  async SendInvitations() {
    let params = {
      userlist: this.inviteUsersList,
      chanel_id: this.grupo.id,
    };
    let res = await this.api.addEntity("invitations", params).toPromise();

    console.log(res);

    if (res.status === "ok") {
      this.utils.showAlert("¡Listo!", "Se han invitado a tus contactos");
      this.api.inviteChanges.next(this.inviteObjectsList);
    }
  }

  SetVisibility() {
    if (
      this.grupo.private == 0 ||
      (this.grupo.private == 1 && this.grupo.user_belongs == true)
    ) {
      this.IsVisible = true;
    } else {
      this.IsVisible = false;

      if (this.grupo.user_tried_to_join == true) {
        this.TriedToJoin = true;
      }
    }
  }

  async getInvitableUsers() {
    let res = await this.api.getEntity("seguidores", 1).toPromise();
    console.log("INVITED USERs =>");

    console.log(res);

    if (typeof res.data != "boolean") {
      this.InvitableUsers = res.data;

      this.filterUsers();
    } else {
      this.NoFriends = true;

      console.log("NoFriends");
    }
  }

  filterUsers() {
    for (let x = 0; x < this.grupo.users_list.length; x++) {
      for (let y = 0; y < this.InvitableUsers.length; y++) {
        if (this.InvitableUsers[y].id == this.grupo.users_list[x].id) {
          console.log("DELETE THIS USER=>");

          console.log(this.InvitableUsers[y]);

          this.InvitableUsers.splice(y, 1);
        }
      }
    }
    console.log("AHORA LOS INVITADOS SON =>");
    console.log(this.InvitableUsers);
  }

  async JoinGroup() {
    await this.utils.showLoading("Añadiendo solicitud");

    let params = {
      chanel_id: this.grupo.id,
    };

    console.log("PARAMS=>");

    console.log(params);

    let res = await this.api.addEntity("chanelrequest", params).toPromise();

    console.log("Respuesta=>");

    console.log(res);

    if (res.status === "ok") {
      this.grupo.user_tried_to_join = true;
      this.TriedToJoin = true;
    }
    this.utils.dismissLoading();
  }

  GoToProfile(evento) {
    console.log("EVENT IS");

    console.log(evento);

    this.nav.navigateForward("/perfil-publico", {
      state: {
        userProfile: evento,
      },
    });
  }
}
