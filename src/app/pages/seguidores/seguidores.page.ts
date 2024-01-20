import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { User } from "src/app/models/User";
import { ApiService } from "src/app/services/api.service";
import { UserService } from "src/app/services/user.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-seguidores",
  templateUrl: "./seguidores.page.html",
  styleUrls: ["./seguidores.page.scss"],
})
export class SeguidoresPage implements OnInit {
  isLoading: boolean = true;
  following: boolean;
  user: User;
  title: string = "Seguidores";
  UserList: User[] = [];
  constructor(
    private api: ApiService,
    private utils: UtilitiesService,
    private Uservice: UserService,
    private navctrl: NavController
  ) {}

  async ngOnInit() {}

  async ionViewWillEnter() {
    this.ResetValues();
    this.isLoading = true;

    if (typeof history.state.Followers != "undefined") {
      this.following = history.state.Followers;
    } else {
      this.following = true;
    }

    if (typeof history.state.user != "undefined") {
      console.log("setting user from history");

      this.user = history.state.user;
    } else {
      await this.Uservice.getUser().then((user) => {
        console.log("No user, setting from service");
        this.user = user;
      });
    }

    await this.SetView().then(() => {
      setTimeout(() => {
        this.isLoading = false;
      }, 100);
    });
  }
  ResetValues() {
    this.user = null;
    this.title = "";
    this.UserList = [];
  }

  async SetView() {
    if (this.following) {
      this.title = "Seguidores";
      this.SetFollowingView();
    } else {
      this.title = "Siguiendo";
      await this.SetFollowersView().then(() => {});
    }
  }

  async SetFollowersView() {
    console.log("Traete a los que  al usuario sigue");
    let query = "following";

    await this.getUserList(query).then(() => {});
  }

  async SetFollowingView() {
    console.log("Traete a los que siguen al usuario");
    let query = "follower";

    await this.getUserList(query).then(() => {});
  }

  async getUserList(params) {
    try {
      let res = await this.api.getEntity(params, this.user.id).toPromise();
      console.log(res);
      this.UserList = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async Follow($event) {
    let user = $event;
    console.log(user);

    await this.utils.showLoading("Actualizando...");
    console.log("se seguira ");

    let params = {
      seguido_id: user.id,
    };

    this.api.addEntity("seguidores", params).subscribe((seguido) => {
      console.log(seguido);
    });
    this.utils.dismissLoading();
  }

  async Unfollow($event) {
    let user = $event;
    console.log(user);

    await this.utils.showLoading("Actualizando...");
    console.log("se deja de seguir");

    this.api.deleteEntity("seguidores", user.id).subscribe((seguido) => {
      console.log(seguido);
    });

    this.utils.dismissLoading();
  }

  Back() {
    if (this.user.IsCurrentUser) {
      if (this.user.role_id == 4) {
        this.navctrl.navigateRoot("/tabs/perfil-banners");
      } else {
        this.navctrl.navigateRoot("/tabs/perfil");
      }
    } else {
      this.navctrl.navigateForward("/perfil-publico", {
        state: {
          userProfile: this.user,
        },
      });
    }
  }
}
