import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Grupos } from "src/app/models/Grupos";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-canales-grupos",
  templateUrl: "./canales-grupos.page.html",
  styleUrls: ["./canales-grupos.page.scss"],
})
export class CanalesGruposPage implements OnInit {
  constructor(
    private utilitiesService: UtilitiesService,
    private navCtrl: NavController,
    private apiService: ApiService,
    private translateService: TranslateService
  ) {}

  public chanels;
  public OwnChanels: any;
  public OtherChanels: any;
  DisplayOwnGroups: boolean = true;
  IsLoading: boolean = true;

  async ngOnInit() {
    // this.canales = this.utilitiesService.canales;
    await this.innitPage();
    this.apiService.groupChanges.subscribe(() => {
      this.innitPage();
    });
    this.apiService.inviteChanges.subscribe(() => {
      this.innitPage();
    });
  }

	public back() {
    this.navCtrl.navigateForward("/tabs");
  }

  async innitPage() {
    await this.getChanels().then(() => {
      this.IsLoading = false;
    });
  }
  async getChanels() {
    try {
      let res = await this.apiService.getEntity("Chanels").toPromise();

      console.log("RESPONSE: ");

      console.log(res);
      this.OwnChanels = res.OwnChanels;
      this.OtherChanels = res.OtherChanels;
      // this.SetChanels();
      this.chanels = this.OwnChanels;
    } catch (error) {
      console.log(error);
    }
  }

  SetChanels() {
    if (this.DisplayOwnGroups) {
      this.ChangeList();
      this.chanels = this.OwnChanels;
    } else {
      this.ChangeList();
      this.chanels = this.OtherChanels;
    }
  }
  ChangeList() {
    console.log("empieza animation");

    let element = document.getElementById("chanels-display");

    console.log(element);
    element.classList.toggle("slide-out-top");
    // setTimeout(() => {
    //   element.classList.toggle("slide-out-top");
    // }, 1000);

    setTimeout(() => {
      element.classList.remove("slide-out-top");
    }, 1000);

    element.classList.toggle("slide-in-bottom");
    setTimeout(() => {
      element.classList.remove("slide-in-bottom");
    }, 1000);

    console.log("Fin animation");
  }

  // public goToChannel(canal) {
  //   this.navCtrl.navigateForward("group/" + canal.id);
  // }

  goToGrupos(grupo) {
    this.navCtrl.navigateForward("grupo", {
      state: {
        grupo: grupo,
      },
    });
  }

  SetDisplayMode(mode) {
    this.DisplayOwnGroups = mode;
    console.log("DISPLAY OWN GROUPS?");
    console.log(this.DisplayOwnGroups);
    this.SetChanels();
  }

  async JoinGroup($event) {
    await this.utilitiesService.showLoading(this.translateService.instant("Añadiendo solicitud"));

    const grupo = this.chanels.find((obj) => obj.id === $event);
    let params = {
      chanel_id: grupo.id,
    };

    console.log("PARAMS=>");

    console.log(params);

    let res = await this.apiService
      .addEntity("chanelrequest", params)
      .toPromise()
      .then((res) => {
        console.log("Respuesta=>");

        console.log(res);

        if (res.status === "ok") {
          grupo.user_tried_to_join = true;

          this.utilitiesService.dismissLoading();
          
        } else {
          this.utilitiesService.showAlert(
            this.translateService.instant("¡Vaya!"),
            this.translateService.instant("Ha ocurrido un error, intentelo mas tarde")
          );
          this.utilitiesService.dismissLoading();
        }
      });
  }
}
