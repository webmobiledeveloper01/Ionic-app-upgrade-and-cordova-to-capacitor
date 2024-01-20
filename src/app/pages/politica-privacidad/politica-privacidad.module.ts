import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PoliticaPrivacidadPage } from './politica-privacidad.page';

const routes: Routes = [
  {
    path: '',
    component: PoliticaPrivacidadPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PoliticaPrivacidadPage]
})
export class PoliticaPrivacidadPageModule {}
