import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditQuestionPage } from './edit-question.page';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: EditQuestionPage
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
  declarations: [EditQuestionPage]
})
export class EditQuestionPageModule {}
