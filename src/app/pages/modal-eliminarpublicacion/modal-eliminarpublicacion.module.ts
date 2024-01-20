import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalEliminarpublicacionPage } from './modal-eliminarpublicacion.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEliminarpublicacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalEliminarpublicacionPage]
})
export class ModalEliminarpublicacionPageModule {}
