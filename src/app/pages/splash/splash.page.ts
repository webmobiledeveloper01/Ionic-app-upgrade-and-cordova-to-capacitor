import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";
import { SplashScreenPlugin } from "@capacitor/splash-screen";
import { ModalController, NavController } from "@ionic/angular";
import { AuthenticationService } from "src/app/services/authentication.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-splash",
  templateUrl: "./splash.page.html",
  styleUrls: ["./splash.page.scss"],
standalone: false,
})
export class SplashPage implements OnInit {
  isLoading: boolean = false;
  //video: HTMLVideoElement;
  domainUrl: string = environment.domainUrl;
  constructor(
    private nav: NavController
  ) {}

  ngOnInit() {
    // console.log("Entra en la splash");
    // this.video = document.createElement('video');
    // this.video.src = environment.domainUrl + "storage/assets/Ko9gkmVtRwRVUa1FsW0ugvuO58smeNvXr9CkP1AR.mp4";
    // this.video.oncanplay = () => {
    //   this.isLoading = false;
    //   console.log("EMPIEZA EL VIDEO");
    //
  }

  onVideoCanPlay($event) {
    this.isLoading
      ? (this.isLoading = false)
      : console.log("Ya era falso el loading");

    console.log("se ve el video");

    $event.target.style.visibility = "visible";
  }

  HandleError(event) {
    //console.log("ERROR REPRODUCIENDO EL VIDEO");
    //console.log("URL ES", this.video.src);
    //console.log("Que ha pasado?", event);
    //
    //this.nav.navigateRoot("/register");
  }

  ionViewDidEnter() {
    setTimeout(() => {
      console.log("SE ESCONDE EL VIDEO");
      //this.modalController.dismiss();

      // if (state != "" && state != null) {
      // this.nav.navigateRoot("/tabs");
      // } else {
      this.nav.navigateRoot("/register");
      // }
    }, 4500);
  }
}
