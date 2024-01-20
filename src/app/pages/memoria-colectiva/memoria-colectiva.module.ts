import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MemoriaColectivaPage } from './memoria-colectiva.page';

const routes: Routes = [
  {
    path: '',
    component: MemoriaColectivaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MemoriaColectivaPage]
})
export class MemoriaColectivaPageModule {}
