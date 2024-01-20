import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Receta } from "src/app/models/Receta";
import { User } from "src/app/models/User";
import { ApiService } from "src/app/services/api.service";
import { UserService } from "src/app/services/user.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-mis-recetas",
  templateUrl: "./mis-recetas.page.html",
  styleUrls: ["./mis-recetas.page.scss"],
})
export class MisRecetasPage implements OnInit {
  User: User;
  recipes: Receta[] = [];
  // testRecetas=[
  //   // src="https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2022/01/26/16431994112862.jpg"
  //   {img:"https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2022/01/26/16431994112862.jpg",name:"Tarta de chocolate"},
  //   {img:"https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2022/01/26/16431994112862.jpg",name:"Tarta de chocolate"},
  //   {img:"https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2022/01/26/16431994112862.jpg",name:"Tarta de chocolate"},
  //   {img:"https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2022/01/26/16431994112862.jpg",name:"Tarta de chocolate"},
  //   {img:"https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2022/01/26/16431994112862.jpg",name:"Tarta de chocolate"},
  //   // {img:"https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2022/01/26/16431994112862.jpg"},
  //   // {img:"https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2022/01/26/16431994112862.jpg"},
  // ];
  sinRecetas: boolean = false;
  isLoading: boolean = true;
  Error: boolean = true;

  constructor(
    private api: ApiService,
    private uservice: UserService,
    private utils: UtilitiesService,
    private nav: NavController
  ) {}

  async ngOnInit() {
    this.api.recipeChanges.subscribe(() => {
      console.log("HA OCURRIDO UN CAMBIO");
    });

    await this.innitPage().then(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.sinRecetas = false;
    this.Error = false;
  }

  async innitPage() {
    this.getUser().then(() => {
      this.getRecipes();
    });
  }

  /**
   * Get the user from the user service
   */

  async getUser() {
    this.User = await this.uservice.getUser();

    console.log("User is");

    console.log(this.User);
  }

  /**
   * Get the list of recipes from db
   */
  async getRecipes() {
    let res = await this.api.getEntity("receta", this.User.id).toPromise();

    this.SetPage(res);
  }

  /**
   * Recibe la respuesta del servidor y actua en consecuencia
   *
   * @param response
   */
  SetPage(response) {
    console.log("AL SET LLEGA");
    console.log(response);

    switch (response.status) {
      case "ok":
        this.recipes = response.data;
        
        console.log(response.message);
        this.sinRecetas = false;
        break;

      case "void":
        this.sinRecetas = true;
        break;

      case "fail":
        this.HandleError(response);

        break;
    }
  }

  HandleError(response) {
    //   return response()->json([
    //     'status' => 'fail',
    //     'message' => $message,
    //     'data' => $th->getMessage(),
    //     'trace' => $th->getTraceAsString(),
    // ]);

    this.utils.showAlert("¡Vaya!", response.message);
    console.error(response.data);
    console.error("ERROR TRACE", response.trace);
  }

  back() {
    this.nav.back();
  }

  GoTo(receta) {
    this.nav.navigateForward("/detalle-recetas", {
      state: {
        receta: receta,
      },
    });
  }
}
