import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-only-chanels",
  templateUrl: "./only-chanels.page.html",
  styleUrls: ["./only-chanels.page.scss"],
standalone: false,
})
export class OnlyChanelsPage implements OnInit {
  Chanels: any[] = [];
  void: boolean = false;
  IsLoading: boolean = true;
  constructor(private api: ApiService, private utils: UtilitiesService, private navCtrl: NavController) {}

  async ngOnInit() {
    await this.getChanels().then(() => {
      this.IsLoading = false;
    });
  }

	public back() {
    this.navCtrl.navigateForward("/tabs");
  }

  async getChanels() {
    await this.api
      .getEntity("onlychanels")
      .toPromise()
      .then((res) => {
        console.log("LLEGA ESTO=> ", res);

        if (res.status === "ok") {
          this.Chanels = res.data;

          this.void = this.Chanels.length < 0;

        } else {
          this.utils.showAlert("¡Vaya!", res.message);
          this.void = true;
        }
      })
      .catch((res) => {
        this.void = true;
        console.log(res);
        this.utils.showAlert(
          "¡Vaya!",
          "Ha ocurrido un error en el servidor, pruebe mas tarde"
        );
      });
  }



  goToGrupos(grupo) {
    this.navCtrl.navigateForward("grupo", {
      state: {
        grupo: grupo,
      },
    });
  }
}
