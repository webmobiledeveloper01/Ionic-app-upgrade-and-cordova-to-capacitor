import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MappPage } from './mapp.page';
import { ComponentsModule } from 'src/app/components/components.module';


const routes: Routes = [
  {
    path: '',
    component: MappPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MappPage]
})
export class MappPageModule {}
