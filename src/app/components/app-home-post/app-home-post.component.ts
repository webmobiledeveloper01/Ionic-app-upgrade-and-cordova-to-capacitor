import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-home-post",
  templateUrl: "./app-home-post.component.html",
  styleUrls: ["./app-home-post.component.scss"],
})
export class AppHomePostComponent implements OnInit {
  @Input() post: any;
  @Output() onPostLike = new EventEmitter<any>();
  @Output() onPostDislike = new EventEmitter<any>();
  @Output() onPostGoDetails = new EventEmitter<any>();
  @Output() onPostReport = new EventEmitter<any>();
  @Output() onPostShare = new EventEmitter<any>();
  @Output() onPostGoProfile = new EventEmitter<any>();
  @Output() onTrueDislike = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    console.log("post is=> ", this.post);
  }

  megustas() {
    this.onPostLike.emit(this.post);
  }

  nomegustas() {
    this.onPostDislike.emit(this.post);
  }

  GoDetails() {
    this.onPostGoDetails.emit(this.post);
  }
  reportar() {
    this.onPostReport.emit(this.post.id);
  }

  openShare() {
    this.onPostShare.emit(this.post);
  }
  GoToProfile() {
    this.onPostGoProfile.emit(this.post.user);
  }

  Dislike() {
    this.onTrueDislike.emit(this.post);
  }
}
