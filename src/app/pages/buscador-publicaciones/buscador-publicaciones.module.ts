import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BuscadorPublicacionesPage } from './buscador-publicaciones.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: BuscadorPublicacionesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes), TranslateModule
  ],
  declarations: [BuscadorPublicacionesPage],
  providers: [NativeGeocoder]
})
export class BuscadorPublicacionesPageModule {}
