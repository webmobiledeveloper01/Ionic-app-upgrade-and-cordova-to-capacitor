import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GeoaskPreguntaEnElMapaPage } from './geoask-pregunta-en-el-mapa.page';
import { TranslateModule } from '@ngx-translate/core';



const routes: Routes = [
  {
    path: '',
    component: GeoaskPreguntaEnElMapaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  declarations: [GeoaskPreguntaEnElMapaPage]
})
export class GeoaskPreguntaEnElMapaPageModule {}
