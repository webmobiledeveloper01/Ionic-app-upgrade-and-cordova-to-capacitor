import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { NavController } from "@ionic/angular";
import { Category } from "src/app/models/Category";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-crear-canal",
  templateUrl: "./crear-canal.page.html",
  styleUrls: ["./crear-canal.page.scss"],
})
export class CrearCanalPage implements OnInit {
  categories: Category[][];
  isLoading: boolean = true;
  form;
  members;

  constructor(
    private api: ApiService,
    private utils: UtilitiesService,
    private fb: FormBuilder,
    private nav: NavController
  ) {}

  async ngOnInit() {
    this.form = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      category_id: ["", Validators.required],
      private: ["", Validators.required],
    });

    await this.getCategories().then(() => {
      this.isLoading = false;
    });
  }

  ionViewDidEnter() {
    try {
      console.log("ENTRA EN EL STATE");
      console.log(history.state);

      if (history.state.check == undefined || history.state.check.length < 1) {
        console.log("NO USERS");
        this.members = [];
      } else {
        console.log("found users");

        this.members = history.state.check;

        console.log(this.members);
      }
    } catch {
      console.log("Error en el history check");
    }
  }

  ngOnDestroy() {
    history.state.check = null;
    console.log("SETED AS NULL");
  }

  //<----------------------METODOS GET---------------------->
  async getCategories() {
    try {
      let res = await this.api
        .getEntity("ChanelsCategories")
        .toPromise()
        .catch((err) => {
          throw new Error(err);
        });

      console.log("RESPONSE =>");

      console.log(res);

      if (res.status === "ok") {
        this.categories = res.data;
      } else {
        throw new Error(res);
      }
    } catch (error) {
      this.utils.showAlert("¡Vaya!", "Ha ocurrido un error en el servidor");

      console.log(error);
    }
  }
  //<----------------------FIN METODOS GET---------------------->

  //<----------------------METODOS SET VALUES---------------------->
  SetCategoryValue($event) {
    this.selectControl($event.target, 0);

    console.log("EVENT IS=>");

    console.log($event.target.id);

    this.form.get("category_id").setValue($event.target.id);
  }

  SetPrivacy($event) {
    this.selectControl($event.target, 1);
    this.form.get("private").setValue($event.target.id);
  }

  selectControl(SelectedChip, options) {
    let chips;
    switch (options) {
      case 0:
        chips = document
          .getElementById("category-wrap")
          .getElementsByTagName("ion-chip");
        break;
      case 1:
        chips = document
          .getElementById("privacy-wrap")
          .getElementsByTagName("ion-chip");
        break;
    }

    console.log("Chips are=>");
    console.log(chips);

    for (let index = 0; index < chips.length; index++) {
      let chip = chips[index];
      if (chip.classList.contains("custom")) {
        chip.classList.remove("custom");
      }
    }
    SelectedChip.classList.toggle("custom");
  }

  ////////////////////////////////SUBMIT///////////////

  async CreateChanel() {
    console.log(this.form.value);

    let params = {
      formValues: this.form.value,
      members: this.members,
    };

    try {
      await this.utils.showLoading("Añadiendo grupo");
      let res = await this.api.addEntity("Chanels", params).toPromise();

      if (res.status === "ok") {
        this.utils.dismissLoading();

        this.api.groupChanges.next("Grupo ha sido creado");
        this.utils.showAlert("¡Listo!", "Tu grupo ha sido creado");
        this.nav.navigateBack("/tabs/canales-grupos");
      } else {
        console.log(res);

        throw new Error(res);
      }
    } catch (error) {
      console.log(error);
      this.utils.showAlert("¡Error!", error.message);
    }
  }
  back() {
    this.nav.navigateBack("/tabs/canales-grupos");
  }

  HandlError() {
    this.utils.showAlert(
      "¡Vaya!",
      "Ha ocurrido un error en el servidor, por favor intentelo de nuevo mas tarde"
    );
    this.nav.back();
  }
}
