import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MemoriaPaginaPage } from './memoria-pagina.page';

const routes: Routes = [
  {
    path: '',
    component: MemoriaPaginaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MemoriaPaginaPage]
})
export class MemoriaPaginaPageModule {}
