import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonInput, IonicModule, ModalController } from "@ionic/angular";

@Component({
  selector: "app-modal-change",
  templateUrl: "./modal-change.page.html",
  styleUrls: ["./modal-change.page.scss"],
 
})
export class ModalChangePage implements OnInit {
  input: IonInput;
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.input = document.getElementById(
      "Change-input-375"
    ) as unknown as IonInput;
  }

  async closeModal() {
    let coment = this.input.value;
    await this.modalController.dismiss(coment);
  }

  async dissmiss() {
    // let coment = this.input.value;
    await this.modalController.dismiss("");
  }
}
