import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { User } from "src/app/models/User";
import { yearContainer } from "src/app/models/YearContainer";
import { ApiService } from "src/app/services/api.service";
import { UserService } from "src/app/services/user.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-perfil-publico",
  templateUrl: "./perfil-publico.page.html",
  styleUrls: ["./perfil-publico.page.scss"],
})
export class PerfilPublicoPage implements OnInit {
  user;
  isl;
  isMutual: boolean = false;
  isFollower: boolean = false;
  YouFollow: boolean = false;
  NoFollow: boolean = false;
  public verPublicaciones: boolean = true;
  public posts: [] = [];
  lastpost;
  lastContainer;
  isLoading = true;
  public years: yearContainer[];
  ThereIsPosts: boolean = true;

  constructor(
    private navctrl: NavController,
    private api: ApiService,
    private utils: UtilitiesService,
    private uservice: UserService
  ) {}

  ngOnInit() {
    // this.getUser();
  }

  async ionViewWillEnter() {
    console.log("SE EJECUTAWILLENTER");

    await this.getUser().then(() => {
      this.isLoading = false;
    });
    this.posts = [];
  }

  async getUser() {
    this.user = history.state.userProfile;

    console.log("ESTE ES EL PERFIL DE");

    console.log(this.user.user_location);

    this.user.user_location = this.user.user_location.replace("undefined,", "");

    if (this.user.IsCurrentUser) {
      if (this.user.role_id == 4) {
        this.navctrl.navigateRoot("/tabs/perfil-banners");
      } else {
        this.navctrl.navigateRoot("/tabs/perfil");
      }
    }

    await this.SetFollowState(this.user.FollowsCurrentUser);
    // this.isLoading = false;
  }

  getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  async SetFollowState(state) {
    this.isMutual = false;
    this.isFollower = false;
    this.YouFollow = false;
    this.NoFollow = false;

    switch (state) {
      case 0:
        //They dont follow at all

        this.NoFollow = true;
        break;
      case 1:
        //only current user is followed
        this.isFollower = true;

        break;

      case 2:
        //They are mutuals
        this.isMutual = true;

        break;

      case 3:
        //only current user follows
        this.YouFollow = true;
        break;
    }
    await this.CheckIfPostAreVisible();
  }

  async RefreshUser() {
    let res = await this.api.getSingleUser(this.user.id).toPromise();

    console.log("SE REFRESCA EL USUARIO");
    console.log(res);

    this.user = res;

    this.SetFollowState(this.user.FollowsCurrentUser);

    this.utils.dismissLoading();
  }

  // <---- METODOS FOLLOW/UNFOLLOW---->
  async StopFollow() {
    await this.utils.showLoading("Actualizando...");
    console.log("se deja de seguir");

    this.api.deleteEntity("seguidores", this.user.id).subscribe((seguido) => {
      console.log(seguido);
      this.RefreshUser();
    });
    this.ResetPageVariables();
    this.CheckIfPostAreVisible();
  }

  /**
   * Reset States of page
   */
  ResetPageVariables(): void {
    this.YouFollow = false;
    this.isMutual = false;
    this.posts = [];
    this.years = [];
  }
chat(){
  this.navctrl.navigateForward("/chats", {

  });
}
  async Follow() {
    await this.utils.showLoading("Actualizando...");
    console.log("se  seguira a ", this.user.name);

    let params = {
      seguido_id: this.user.id,
    };

    this.api.addEntity("seguidores", params).subscribe((seguido) => {
      console.log(seguido);
      this.RefreshUser();
    });
    this.CheckIfPostAreVisible();
  }

  async CheckIfPostAreVisible() {
    if (this.YouFollow || this.isMutual) {
      this.verPublicaciones = true;

      await this.GetPost();

      console.log("Los post son Visibles");
    } else {
      console.log("Los post NO son Visibles");

      this.verPublicaciones = false;
    }
  }

  // <---- FIN METODOS FOLLOW/UNFOLLOW---->

  async CreateYearBlocks() {
    this.posts.forEach((post, index) => {
      this.years == undefined ? (this.years = []) : (this.years = this.years);
      console.log(this.years);

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
  async GetPost() {
    let res = await this.api.getUserPost(this.user.id).toPromise();

    console.log("POSTS =>");

    console.log(res);

    this.posts = res.data;

    if (this.posts.length <= 0) {
      this.ThereIsPosts = false;
    } else {
      this.CreateYearBlocks();
    }
  }
  GoToFollowers() {
    this.navctrl.navigateForward("/seguidores", {
      state: {
        Followers: true,
        user: this.user,
      },
    });
  }

  GoToFollowing() {
    this.navctrl.navigateForward("/seguidores", {
      state: {
        Followers: false,
        user: this.user,
      },
    });
  }

  back() {
    this.navctrl.navigateBack("/tabs/home");
  }
  async sliderChanges($event, post) {
    // const context = this;
    // this.slides.getActiveIndex().then(index => {
    //   console.log('@@@@ sliderChanges: index:', index);

    //   if (index === 3) {

    let res = await $event.target.getActiveIndex();
    console.log(res);

    post.postPosition = res + 1;

    //   }

    // });
  }
  GoDetails(post) {
    this.navctrl.navigateForward("/detalle-publicacion/" + post.id, {
      state: {
        post: post,
      },
    });
  }
}
