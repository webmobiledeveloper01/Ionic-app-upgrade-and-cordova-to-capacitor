import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { User } from "src/app/models/User";
import { ApiService } from "src/app/services/api.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.page.html",
  styleUrls: ["./tabs.page.scss"],
standalone: false,
})
export class TabsPage implements OnInit {
  public user: User;
  public visibleTab: boolean = true;


  // test

  // public pagesIzq = [
  //   { tab: "canales-grupos", name: "", icon: "/assets/icons/search 1.svg" },
  // ];

  public pagesIzq = [
    { tab: "buscador-publicaciones", name: "", icon: "/assets/icons/search 1.svg" },
  ];

  // public pagesDcha = [
  //   { tab: "map", name: "", icon: "/assets/icons/map 1.svg" },
  //   { tab: "perfil", name: "", icon: "/assets/icons/user 1.svg" },
  // ];

  public pagesDcha = [];

  constructor(
    private menuCtrl: MenuController,
    private api: ApiService,
    private userService: UserService
  ) {
    this.getUser();
  }

  ngOnInit() {}

  async getUser() {
    this.user = await this.userService.getUser();
    console.log("tabs tiene el user");

    if (this.user.role_id == 4) {

      this.pagesDcha = [
        { tab: "mapp", name: "", icon: "/assets/icons/map 1.svg" },
        { tab: "perfil-banners", name: "", icon: "/assets/icons/user 1.svg" },
      ];
      console.log(this.pagesDcha);

    } else {
      this.pagesDcha = [
        { tab: "mapp", name: "map", icon: "/assets/icons/map 1.svg" },
        { tab: "perfil", name: "", icon: "/assets/icons/user 1.svg" },
      ];
    }
    console.log(this.pagesDcha);

  }
  public tabChange(event) {
    console.log("tab", event);
    let tab = event.tab;

    switch (tab) {
      case "map":
        this.visibleTab = false;
        break;
      default:
        this.visibleTab = true;
        break;
    }

    console.log("tab debería ser:", this.visibleTab);
  }

  public abrirMenu() {
    this.menuCtrl.open();
  }
}
