import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FullscreenImagePage } from './fullscreen-image.page';

const routes: Routes = [
  {
    path: '',
    component: FullscreenImagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FullscreenImagePage]
})
export class FullscreenImagePageModule {}
