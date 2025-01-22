import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ApplicationRef,
  ChangeDetectorRef,
  NgZone,
} from "@angular/core";
import { Router } from "@angular/router";
import { NavController, Platform } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-app-header",
  templateUrl: "./app-header.component.html",
  styleUrls: ["./app-header.component.scss"],
standalone: false,
})
export class AppHeaderComponent implements OnInit {
  @Input() textHeader: string = "";
  @Input() imageNotification: string = "";
  @Input() imageArrow: string = "";
  @Input() arrowBack: boolean = false;
  @Input() showNotification: boolean = false;
  @Input() editButton: boolean = true;
  @Input() route: string = "";
  @Input() textButton: string = "";
  public notificaciones: Notification[] = [];
  countNotificaciones: number;
  imageNotificationActivated: string = "assets/icon/campana-orange.png";

  //Cuando se dispare este evento redirigo a la pagina que yo quiera
  //Realmente el string que emito no lo estoy usando en ningun lado
  @Output() onReturnPage: EventEmitter<string> = new EventEmitter();

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private apiService: ApiService,
    private platform: Platform,
    private ChangeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  async ngOnInit() {
    if (this.platform.is("ios")) {
      console.log("ES IOS");

      let el = document.getElementById("id-header");

      el.style.marginTop = "7.5%";
    } else {
      console.log("Not IOS");
      let el = document.getElementById("id-header");

      el.style.marginTop = "5.5%";
    }
    await this.getNotifications();
    this.apiService.notificationChanges.subscribe(async () => {
      this.ngZone.run(async () => {
        await this.getNotifications();
      });
    });
  }

  async getNotifications() {
    let res = await this.apiService.getEntity("news").toPromise();
    this.countNotificaciones = res;
    if (res > 0) {
      this.showNotification = true;
    }
    console.log("notificaciones en header");
    console.log(this.countNotificaciones);
    this.ChangeDetectorRef.detectChanges();
  }

  //Se dispara cuando hago clic en la flecha de volver atras
  //El objetivo es volver a la ruta correcta según en que página me encuentro actualmente
  returnToPage() {
    //Guardo la ruta actual
    const url = this.router.url;
    console.log(url);
    if (url === "/tabs/home") {
      this.onReturnPage.emit("returnHomePage");
    } else if (url === "/my-requests") {
      this.onReturnPage.emit("returnMyRequestsPage");
    } else {
      console.log("entra");
      this.navCtrl.back();
    }
  }
}
