import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PerfilBannersPage } from './perfil-banners.page';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: PerfilBannersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PerfilBannersPage]
})
export class PerfilBannersPageModule {}
