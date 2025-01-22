import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Banner } from "src/app/models/Banner";
import { environment } from "src/environments/environment";


@Component({
  selector: "app-ad-banner",
  templateUrl: "./app-ad-banner.component.html",
  styleUrls: ["./app-ad-banner.component.scss"],
standalone: false,
})
export class AppAdBannerComponent implements OnInit {
  @Input() banner?: Banner;
  @Output() IsTapped: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).src =
      environment.domainUrl + "storage/banners/October2022/XsC2uuXbhgmrbOOXevJ5.jpg";
  }

  openWindow() {

    console.log(this.banner);

    this.IsTapped.emit(this.banner.banner_url);
  }
}
