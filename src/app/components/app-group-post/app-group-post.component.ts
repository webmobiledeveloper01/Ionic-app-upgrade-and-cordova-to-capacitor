import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NavController } from "@ionic/angular";
import moment from "moment";

@Component({
  selector: "app-group-post",
  templateUrl: "./app-group-post.component.html",
  styleUrls: ["./app-group-post.component.scss"],
})
export class AppGroupPostComponent implements OnInit {
  @Input() post: any;
  @Output() LikeUnlike: EventEmitter<object> = new EventEmitter<object>();
  @Output() GoToProfile: EventEmitter<object> = new EventEmitter<object>();

  time: any;

  constructor(private nav: NavController) {}

  ngOnInit() {
    this.setValueOfTime();
  }
  setValueOfTime() {
    this.time = moment(this.post.created_at).format("d MMM");
  }

  pulse($event) {
    $event.target.classList.contains("custom")
      ? this.DeactivateIcon($event)
      : this.ActivateIcon($event);

    //
    // setTimeout(() => {
    //   // $event.target.classList.remove("custom");
    // }, 2000);
  }
  DeactivateIcon($event: any) {
    console.log("deactivate");
    $event.target.classList.remove("custom");
    $event.target.classList.toggle("custom-out");

    setTimeout(() => {
      $event.target.src = "../../../assets/icons/custom/like.svg";
      $event.target.classList.remove("custom-out");
    }, 900);

    let params = {
      id: this.post.id,
      like: false,
    };
    this.post.isliked=false;
    if (this.post.megustas > 0) {
      this.post.megustas--;
    }
    this.LikeUnlike.emit(params);
  }
  ActivateIcon($event: any) {
    console.log("activate");

    $event.target.src = "../../../assets/icons/custom/like-on.svg";

    $event.target.classList.toggle("custom");

    let params = {
      id: this.post.id,
      like: true,
    };
    this.post.megustas++;
    this.post.isliked=true;
    this.LikeUnlike.emit(params);
  }

  GoTo() {
    this.nav.navigateForward("/detalle-publicacion/" + this.post.id, {
      state: {
        post: this.post,
      },
    });
  }



  GotoProfile(){
    this.GoToProfile.emit(this.post.user);
  }
}
