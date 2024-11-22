import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditarPublicacionPage } from './editar-publicacion.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';

const routes: Routes = [
  {
    path: '',
    component: EditarPublicacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes), TranslateModule,
  ],
  declarations: [EditarPublicacionPage],
  providers: [NativeGeocoder, FileTransfer]
})
export class EditarPublicacionPageModule {}
