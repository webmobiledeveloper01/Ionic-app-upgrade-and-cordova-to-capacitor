import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalSolicitarGrupoPage } from './modal-solicitar-grupo.page';

const routes: Routes = [
  {
    path: '',
    component: ModalSolicitarGrupoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class ModalSolicitarGrupoPageModule {}
