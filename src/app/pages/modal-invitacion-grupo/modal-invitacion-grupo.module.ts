import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalInvitacionGrupoPage } from './modal-invitacion-grupo.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInvitacionGrupoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalInvitacionGrupoPage]
})
export class ModalInvitacionGrupoPageModule {}
