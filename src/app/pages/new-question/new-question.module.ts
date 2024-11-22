import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewQuestionPage } from './new-question.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';

const routes: Routes = [
  {
    path: '',
    component: NewQuestionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewQuestionPage],
  providers: [NativeGeocoder]
})
export class NewQuestionPageModule {}
