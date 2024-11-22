import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PagoPage } from './pago.page';
import { TranslateModule } from '@ngx-translate/core';
import { Stripe } from '@awesome-cordova-plugins/stripe/ngx';

const routes: Routes = [
  {
    path: '',
    component: PagoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes), TranslateModule
  ],
  declarations: [PagoPage],
  providers: [Stripe]
})
export class PagoPageModule {}
