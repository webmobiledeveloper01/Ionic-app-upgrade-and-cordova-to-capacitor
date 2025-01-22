import { Component, Input, OnInit } from "@angular/core";
import { Receta } from "src/app/models/Receta";

@Component({
  selector: "app-recetas",
  templateUrl: "./app-recetas.component.html",
  styleUrls: ["./app-recetas.component.scss"],
standalone: false,
})
export class AppRecetasComponent implements OnInit {
  @Input() receta?: Receta;
  // @Input() object: any;
  // img: any;
  constructor() {}

  ngOnInit() {
    // this.img = this.object.img;
  }
}
