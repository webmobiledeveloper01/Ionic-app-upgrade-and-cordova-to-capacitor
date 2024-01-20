import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NavController } from "@ionic/angular";
import { User } from "src/app/models/User";

@Component({
  selector: "app-user-follower",
  templateUrl: "./app-user-follower.component.html",
  styleUrls: ["./app-user-follower.component.scss"],
})
export class AppUserFollowerComponent implements OnInit {
  @Input() User: User;
  @Output() onFollow = new EventEmitter<User>();
  @Output() onUnfollow = new EventEmitter<User>();
  NoFollow: boolean;
  isFollower: boolean;
  isMutual: boolean;
  youFollow: boolean;

  constructor(private nav : NavController) {}

  ngOnInit() {
    this.setFollowState(this.User.FollowsCurrentUser);
  }

  setFollowState(state) {
    switch (state) {
      case 0:
        //They dont follow at all

        this.NoFollow = true;
        break;
      case 1:
        //only current user is followed
        this.isFollower = true;

        break;

      case 2:
        //They are mutuals
        this.isMutual = true;

        break;

      case 3:
        //only current user follows
        this.youFollow = true;
        break;
    }
  }

  EmitUnfollow() {
    this.SetNewState(false);

    this.onUnfollow.emit(this.User);
  }
  SetNewState(follow: boolean) {
    if (follow) {
      this.SetFollowState();
    } else {
      this.SetUnfollowState();
    }
  }

  EmitFollow() {
    this.SetNewState(true);
    this.onFollow.emit(this.User);
  }

  SetFollowState() {
    if (this.isFollower) {
      this.isMutual = true;
      this.isFollower = false;
    }

    if (!this.youFollow) {
      this.youFollow = true;
      this.NoFollow = false;
    }
  }
  SetUnfollowState() {
    if (this.isMutual) {
      this.isMutual = false;
      this.isFollower = true;
    }

    if (this.youFollow) {
      this.youFollow = false;
      this.NoFollow = true;
    }
  }

  GoToProfile(usuario) {
    // console.log(usuario);

    this.nav.navigateForward("/perfil-publico", {
      state: {
        userProfile: this.User,
      },
    });
  }
}
