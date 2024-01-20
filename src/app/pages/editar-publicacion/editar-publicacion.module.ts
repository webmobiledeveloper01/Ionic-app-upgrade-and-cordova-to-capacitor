import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditarPublicacionPage } from './editar-publicacion.page';
import { ComponentsModule } from 'src/app/components/components.module';

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
    RouterModule.forChild(routes)
  ],
  declarations: [EditarPublicacionPage]
})
export class EditarPublicacionPageModule {}
