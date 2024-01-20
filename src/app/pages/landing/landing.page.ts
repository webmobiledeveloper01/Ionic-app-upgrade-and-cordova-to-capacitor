import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.page.html",
  styleUrls: ["./landing.page.scss"],
})
export class LandingPage implements OnInit {
  constructor(public api: ApiService) {}
  post: any;
  isLoading: boolean = true;

  ngOnInit() {
    // this.getPost().then(() => {
      this.isLoading = false;
    // });
  }
  async getPost() {
    let res = await this.api.getUserPost(24).toPromise();
    console.log(res);
    this.post = res.data;
  }
  Loggeameesta($event) {
    console.log("LLEGA ESTO");

    console.log($event);
  }
}
