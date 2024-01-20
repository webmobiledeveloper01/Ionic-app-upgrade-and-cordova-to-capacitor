import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { User } from "src/app/models/User";
import { ApiService } from "src/app/services/api.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-modal-banners",
  templateUrl: "./modal-banners.page.html",
  styleUrls: ["./modal-banners.page.scss"],
})
export class ModalBannersPage implements OnInit {
  user: User;
  IsLoading = true;
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private apiService: ApiService,
    private uservice: UserService
  ) {}

  async ngOnInit() {
    
    this.user = await this.uservice.getUser();
    this.IsLoading = false;
  }

	public back() {
    this.navCtrl.navigateForward("/tabs");
  	} 

  irDonacion() {
    this.modalCtrl.dismiss();
    this.navCtrl.navigateForward("/pago-donacion");
  }

  irPin() {
    this.modalCtrl.dismiss();
    this.navCtrl.navigateForward("/crear-pin");
  }

  closeModal() {
    this.apiService.primeraVez().subscribe((user) => {
      this.modalCtrl.dismiss();
    });
  }

  closeVentana() {
    this.navCtrl.navigateBack("/tabs/home");
  }

  GoToSponsor() {
    this.navCtrl.navigateForward("pago");
  }
}
