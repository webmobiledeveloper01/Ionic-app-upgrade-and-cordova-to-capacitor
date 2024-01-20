import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalAjustarImagenPage } from './modal-ajustar-imagen.page';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: ModalAjustarImagenPage
  }
];

@NgModule({
  imports: [
    ImageCropperModule,
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalAjustarImagenPage]
})
export class ModalAjustarImagenPageModule {}
