import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalReportarPublicacionPage } from './modal-reportar-publicacion.page';

const routes: Routes = [
  {
    path: '',
    component: ModalReportarPublicacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalReportarPublicacionPage]
})
export class ModalReportarPublicacionPageModule {}
