import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalInfoSponsorPage } from './modal-info-sponsor.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInfoSponsorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalInfoSponsorPage]
})
export class ModalInfoSponsorPageModule {}
