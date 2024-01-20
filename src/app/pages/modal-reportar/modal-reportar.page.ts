import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";

@Component({
  selector: "app-modal-reportar",
  templateUrl: "./modal-reportar.page.html",
  styleUrls: ["./modal-reportar.page.scss"],
})
export class ModalReportarPage implements OnInit {
  public publicacion_id: any;
  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.publicacion_id = this.navParams.get("id");
  console.log("ModalReportarPage");
  
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
