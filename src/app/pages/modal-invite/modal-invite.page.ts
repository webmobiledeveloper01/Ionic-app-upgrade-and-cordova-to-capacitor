import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule, ModalController } from "@ionic/angular";

@Component({
  selector: "app-modal-invite",
  templateUrl: "./modal-invite.page.html",
  styleUrls: ["./modal-invite.page.scss"],
standalone: false,

})
export class ModalInvitePage implements OnInit {
  invited;
  SelectedUsers: any[] = [];
  NoFriends: boolean = false;
  SelectedObjects: any[]=[];
  constructor(private mcontrol: ModalController) {}

  ngOnInit() {
this.SetFriends();

  }
  SetFriends() {

    console.log("INVITED =>");
    console.log(this.invited);


    this.invited.length < 1 ? this.NoFriends=true : this.NoFriends=false;

  }

  dismiss() {



    this.mcontrol.dismiss({
      inviteList: this.SelectedUsers,
      inviteObjects: this.SelectedObjects,

    });
  }

  dismissNull() {
    this.mcontrol.dismiss({
      inviteList: new Array(),
    });
  }

  selected($event) {
    if ($event.mode == 1) {


      this.SelectedUsers.push($event.id);
      this.SelectedObjects.push($event.user);


    } else {
      this.SelectedUsers = this.SelectedUsers.filter(
        (word) => word != $event.id
      );
      this.SelectedObjects = this.SelectedObjects.filter(
        (word) => word.id != $event.id
      );
    }
    console.log("SelectedUsers=>");
    console.log(this.SelectedUsers);
  }
}
