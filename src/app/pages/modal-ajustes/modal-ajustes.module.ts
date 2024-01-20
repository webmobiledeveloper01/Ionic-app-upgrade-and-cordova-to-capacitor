import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalAjustesPage } from './modal-ajustes.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAjustesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalAjustesPage]
})
export class ModalAjustesPageModule {}
