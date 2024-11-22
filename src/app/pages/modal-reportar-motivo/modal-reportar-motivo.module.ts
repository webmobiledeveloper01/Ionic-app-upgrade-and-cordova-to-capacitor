import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalReportarMotivoPage } from './modal-reportar-motivo.page';
import { TranslateModule } from '@ngx-translate/core';




const routes: Routes = [
  {
    path: '',
    component: ModalReportarMotivoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalReportarMotivoPage],
  // entryComponents: [ModalReportarMotivoPage]
})
export class ModalReportarMotivoPageModule {}
