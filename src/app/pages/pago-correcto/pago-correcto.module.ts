import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PagoCorrectoPage } from './pago-correcto.page';

const routes: Routes = [
  {
    path: '',
    component: PagoCorrectoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PagoCorrectoPage]
})
export class PagoCorrectoPageModule {}
