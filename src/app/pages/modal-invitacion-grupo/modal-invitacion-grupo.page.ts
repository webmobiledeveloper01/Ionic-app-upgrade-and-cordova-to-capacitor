import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule, ModalController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-modal-invitacion-grupo",
  templateUrl: "./modal-invitacion-grupo.page.html",
  styleUrls: ["./modal-invitacion-grupo.page.scss"],
standalone: false,

})
export class ModalInvitacionGrupoPage implements OnInit {
  constructor(private api: ApiService, private mcontrol: ModalController) {}
  id;
  ngOnInit() {}

  closeModal(mode) {
    this.mcontrol.dismiss({
      accepted: mode,
      id: this.id,
    });
  }
}
