import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Stripe, StripeCardTokenParams } from "@ionic-native/stripe/ngx";
import { NavController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { Storage } from "@ionic/storage";
import { UserService } from "src/app/services/user.service";
@Component({
  selector: "app-pago",
  templateUrl: "./pago.page.html",
  styleUrls: ["./pago.page.scss"],
})
export class PagoPage implements OnInit {
  form: FormGroup;
  sponsor: string = "";
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private stripe: Stripe,
    private activeRoute: ActivatedRoute,
    private storage: Storage,
    private navCtrl: NavController,
    private utilities: UtilitiesService,
    private uservice: UserService,
  ) {}

  ngOnInit() {

    

    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      number: ["", [Validators.required]],
      expMonth: ["", [Validators.required]],
      expYear: ["", [Validators.required]],
      cvc: ["", [Validators.required]],
    });
  }

  public async submitForm() {
    await this.utilities.showLoading("Procesando Pago...");

    let card: StripeCardTokenParams = this.form.value;

    this.stripe.createCardToken(card).then(
      (token) => {
        this.apiService
          .procesarPago({ precio: 0.99, stripeToken: token.id, donacion: 0 })
          .subscribe(async (response) => {
            this.utilities.dismissLoading();
            console.log(response);            
          await this.uservice.setUser(response.data);
          this.utilities.showToast("¡Felicidades! a partir de ahora eres sponsor");
            this.navCtrl.navigateRoot("/pago-correcto");
          });
      },
      (error) => {
        this.utilities.dismissLoading();
        this.utilities.showToast("Error al realizar el pago de la Suscripción");
      }
    );
  }

  public irAtras() {
    this.navCtrl.navigateBack("/tabs/home");
  }
}
