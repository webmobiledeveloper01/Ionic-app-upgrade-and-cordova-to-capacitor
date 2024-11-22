import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapaSeleccionPage } from './mapa-seleccion.page';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';

const routes: Routes = [
  {
    path: '',
    component: MapaSeleccionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MapaSeleccionPage],
  providers: [NativeGeocoder]
})
export class MapaSeleccionPageModule {}
