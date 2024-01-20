import { TypeofExpr } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-add-members",
  templateUrl: "./add-members.page.html",
  styleUrls: ["./add-members.page.scss"],
})
export class AddMembersPage implements OnInit {
  seguidores: any[];
  NoFriends: boolean;
  Users: number[] = [];

  constructor(
    private api: ApiService,
    private utils: UtilitiesService,
    private nav: NavController
  ) {}

  async ngOnInit() {
    await this.GetSeguidores();
  }

  async GetSeguidores() {
    try {
      let res = await this.api.getEntity("seguidores", 1).toPromise();

      // console.log("RESPONSE =>");

      if (res.status === "ok") {
        if ((typeof(res.data) !="boolean" )) {
          console.log(res);
          this.seguidores = res.data;

          this.SetMode(true);
        } else {
          this.SetMode(false);
        }
      } else {
        throw new Error(res);
      }
    } catch (error) {
      this.utils.showAlert("¡Vaya!", "Ha surgido un error en el servidor");
      console.log(error);
    }
  }

  SetMode(mode) {
    this.NoFriends = !mode;
    // console.log("CHANGED TO");
    console.log(this.NoFriends);
    
    
  }

  selected($event) {
    // console.log("USERS BEFORE=>");
    // console.log(this.Users);

    if ($event.mode == 1) {
      this.Users.push($event.id);
      // console.log("PUSHED");
    } else {
      this.Users = this.Users.filter((number) => number == $event.id);
      // console.log("DELETED");
    }
    // console.log("THEN=>");

    // console.log(this.Users);
  }

  addMember() {
    console.log(this.Users);

    this.nav.navigateBack("/crear-canal", {
      state: {
        check: this.Users,
      },
    });
  }

  Cancelar() {
    console.log(this.Users);

    this.nav.navigateBack("/crear-canal", {
      state: {
        check: [],
      },
    });
  }

}
