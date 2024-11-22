import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Stripe, StripeCardTokenParams } from '@awesome-cordova-plugins/stripe/ngx';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-pago-donacion',
  templateUrl: './pago-donacion.page.html',
  styleUrls: ['./pago-donacion.page.scss'],
})
export class PagoDonacionPage implements OnInit {

  form: FormGroup

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private stripe: Stripe,
    private activeRoute: ActivatedRoute,
    private storage: Storage,
    private navCtrl: NavController,
    private utilities: UtilitiesService,) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      number: ['', [Validators.required]],
      expMonth: ['', [Validators.required]],
      expYear: ['', [Validators.required]],
      cvc: ['', [Validators.required]],
      precio:['',Validators.required]
    });

  }

  

  public async submitForm() {
   
    await this.utilities.showLoading('Procesando Pago...');
    
    let card: StripeCardTokenParams = this.form.value;
   

    this.stripe.createCardToken(card).then(
      token => {
      
        this.apiService.procesarPago({ precio: this.form.value.precio, stripeToken: token.id,donacion:1}).subscribe(
          async response => {           
            
            console.log(response);
            
            this.utilities.dismissLoading();
            this.navCtrl.navigateRoot('/pago-correcto');
          }
        )
      },error =>{
        this.utilities.dismissLoading();
        this.utilities.showToast('Error al realizar el pago de la Suscripción');
      });

  }

  
  public irAtras() {
    this.navCtrl.back();
  }

}
