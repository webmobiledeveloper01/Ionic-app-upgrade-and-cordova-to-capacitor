import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Ingrediente } from "src/app/models/Ingrediente";
import { PasoReceta } from "src/app/models/PasoReceta";
import { Receta } from "src/app/models/Receta";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-detalle-recetas",
  templateUrl: "./detalle-recetas.page.html",
  styleUrls: ["./detalle-recetas.page.scss"],
})
export class DetalleRecetasPage implements OnInit {
  receta: Receta;
  pasos: PasoReceta[] = [];
  ingredientes: Ingrediente[] = [];
  isLoading: boolean = true;
  time: string;
  error: boolean = false;
  constructor(
    private utils: UtilitiesService,
    private api: ApiService,
    private nav: NavController
  ) {}

  async ngOnInit() {
    console.log(history.state);

    if (history.state.receta != undefined) {
      this.receta = history.state.receta;
      console.log("Receta es =>", this.receta);
      let da = this.receta.tiempo_preparacion;
      let inter;
      inter = da.split(":");
      this.time = inter[0] + ":" + inter[1];
    } else {
      console.log("Receta esta vacio");
      this.nav.navigateRoot("/tabs/home");
    }
    // this.isLoading = false;

    await this.getRecipeData().then(() => {
      this.checkError();
      this.isLoading = false;
    });
  }
  checkError() {
    if (this.error == true) {
      this.utils.showToast("parece que hay un error, pruebe mas tarde");
      this.nav.back();
    } else {
      console.log("todo correcto");
    }
  }

  async getRecipeData() {
    await this.getRecipeIngredients().then(async () => {
      await this.getRecipeSteps();
    });
  }

  async getRecipeSteps() {
    console.log("STEPS");

    let res = await this.api.getEntity("pasos", this.receta.id).toPromise();

    console.log(res);
    if (res != null || res.status == "ok") {
      this.pasos = res.data;
    } else {
      this.error = true;
    }
  }

  // "ingredientes" => "IngredientsController",
  // "pasos" => "RecipeStepsController",

  async getRecipeIngredients() {
    console.log("Ingredientes");

    let res = await this.api
      .getEntity("ingredientes", this.receta.id)
      .toPromise();

    console.log(res);
    if (res != null || res.status == "ok") {
      this.ingredientes = res.data;
    } else {
      this.error = true;
    }
  }

  back() {
    this.nav.back();
  }
}
