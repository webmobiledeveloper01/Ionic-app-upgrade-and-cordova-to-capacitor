import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Banner } from "src/app/models/Banner";

@Component({
  selector: "app-mis-banners",
  templateUrl: "./mis-banners.page.html",
  styleUrls: ["./mis-banners.page.scss"],
})
export class MisBannersPage implements OnInit {
  error: boolean;

  constructor(private nav: NavController) {}
  banners: Banner[];
  Nobanners: boolean = false;
  ngOnInit() {
    this.setBanners();
    console.log(this.banners);
  }
  setBanners() {
    history.state.banners != undefined
      ? (this.banners = history.state.banners)
      : (this.error = true);

    if (this.banners.length <= 1) {
      this.Nobanners = true;
    }
  }

  GoBack() {
    this.nav.back();
  }
}
