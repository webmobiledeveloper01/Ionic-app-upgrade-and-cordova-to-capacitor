import { ApplicationRef, Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Banner } from "src/app/models/Banner";
import { User } from "src/app/models/User";
import { ApiService } from "src/app/services/api.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { UserService } from "src/app/services/user.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-perfil-banners",
  templateUrl: "./perfil-banners.page.html",
  styleUrls: ["./perfil-banners.page.scss"],
standalone: false,
})
export class PerfilBannersPage implements OnInit {
  user: User;
  isLoading = true;
  banners: Banner[] = [];
  NoBanners = false;
  posts: any;
  ThereIsPosts: boolean;
  constructor(
    private navCtrl: NavController,
    private api: ApiService,
    private UserService: UserService,
    private utils: UtilitiesService,
    private auth: AuthenticationService,
    private appref: ApplicationRef,
    private translateService: TranslateService
  ) {}

  async ngOnInit() {
    this.api.userChanges.subscribe(() => {
      this.isLoading = true;
      this.GetUser().then(() => {
        this.GetPost().then(() => {
          this.isLoading = false;
        });
      });
    });

    this.api.bannerChanges.subscribe((change) => {
      console.log("llega al change => ", change);

      if (change.add === true) {
        console.log("mete el banner");
        this.banners.push(change.banner);
        this.appref.tick();
        console.log(this.banners);
      }
    });

    await this.innitPage().then(() => {
      this.GetPost().then(() => {
        this.isLoading = false;
      });
    });
  }

  async innitPage() {
    await this.GetUser().then(async () => {
      await this.GetBanners();
    });
  }
  GoToBanners() {
    if (this.banners.length > 0) {
      this.navCtrl.navigateForward("/mis-banners", {
        state: {
          banners: this.banners,
        },
      });
    }
  }
  async GetUser() {
    this.user = await this.UserService.getUser();
  }

  async GetBanners() {
    let res = await this.api.getEntity("banners", this.user.id).toPromise();

    // console.log("Banners =>");

    // console.log(res);

    if (res.status == "ok") {
      this.banners = res.data;
    } else {
      if (res.status == "void") {
        this.NoBanners = true;
      } else {
        this.utils.showAlert(
          this.translateService.instant("Vaya..."),
          this.translateService.instant("parece que ha habido un error, intentalo de nuevo mas tarde")
        );
        // console.log(res);
      }
    }
  }

  getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  GoToIntranet() {
    window.location.href =
      "http://timemapp.davidtovar.dev/intranet/login";
  }
  async GetPost() {
    let res = await this.api.getUserPost(this.user.id).toPromise();

    console.log("POSTS EN PROFILE BANNER =>");

    console.log(res);

    this.posts = res.data;

    if (this.posts.length <= 0) {
      this.ThereIsPosts = false;
    }
  }
}
