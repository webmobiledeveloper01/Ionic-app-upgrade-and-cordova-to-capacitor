import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-home-post",
  templateUrl: "./app-home-post.component.html",
  styleUrls: ["./app-home-post.component.scss"],
standalone: false,
})
export class AppHomePostComponent implements OnInit {
  @Input() post: any;
  @Output() PostLike = new EventEmitter<any>();
  @Output() PostDislike = new EventEmitter<any>();
  @Output() PostGoDetails = new EventEmitter<any>();
  @Output() PostReport = new EventEmitter<any>();
  @Output() PostShare = new EventEmitter<any>();
  @Output() PostGoProfile = new EventEmitter<any>();
  @Output() TrueDislike = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    console.log("post is=> ", this.post);
  }

  megustas() {
    this.PostLike.emit(this.post);
  }

  nomegustas() {
    this.PostDislike.emit(this.post);
  }

  GoDetails() {
    this.PostGoDetails.emit(this.post);
  }
  reportar() {
    this.PostReport.emit(this.post.id);
  }

  openShare() {
    this.PostShare.emit(this.post);
  }
  GoToProfile() {
    this.PostGoProfile.emit(this.post.user);
  }

  Dislike() {
    this.TrueDislike.emit(this.post);
  }
}
