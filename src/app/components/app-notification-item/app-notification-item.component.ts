import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Notification } from "src/app/models/Notification";
import { ModalInvitacionGrupoPage } from "src/app/pages/modal-invitacion-grupo/modal-invitacion-grupo.page";

@Component({
  selector: "app-notification-item",
  templateUrl: "./app-notification-item.component.html",
  styleUrls: ["./app-notification-item.component.scss"],
standalone: false,
})
export class AppNotificationItemComponent implements OnInit {
  @Input() notification: Notification;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onInvite = new EventEmitter<Object>();
  @Output() onRequest = new EventEmitter<Object>();

  constructor(private mcontrol: ModalController) {}

  ngOnInit() {}

  public deleteNotification(id: number): void {
    this.onDelete.emit(this.notification.id);
  }

  CheckIfInvite() {
    if (this.notification.invite_id != 0) {
      console.log("Es invitacion");
      console.log(this.notification.invite_id);


      let params = {
        id:this.notification.invite_id,
        not_id:this.notification.id,
      };
      this.onInvite.emit(params);
    }else{

      if (this.notification.request_id!=0) {

// @Output()  = new EventEmitter<Object>();
console.log(this.notification);

let params = {
  id:this.notification.request_id,
  not_id:this.notification.id,
};

this.onRequest.emit(params);

      }else{
        console.log("no es invitacion ni request");

      }

    }
  }









}
