import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SubirRecetasPage } from './subir-recetas.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';

const routes: Routes = [
  {
    path: '',
    component: SubirRecetasPage
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
        IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubirRecetasPage],
  providers: [NativeGeocoder]
})
export class SubirRecetasPageModule {}
