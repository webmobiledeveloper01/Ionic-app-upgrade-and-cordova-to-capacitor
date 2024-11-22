import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CrearPinPage } from './crear-pin.page';
import { TranslateModule } from '@ngx-translate/core';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';

const routes: Routes = [
  {
    path: '',
    component: CrearPinPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,

  ],
  declarations: [CrearPinPage],
  providers: [NativeGeocoder]
})
export class CrearPinPageModule {}
