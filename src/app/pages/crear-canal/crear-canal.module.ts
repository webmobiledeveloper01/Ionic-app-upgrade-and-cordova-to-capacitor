import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CrearCanalPage } from "./crear-canal.page";
import { ComponentsModule } from "src/app/components/components.module";

const routes: Routes = [
  {
    path: "",
    component: CrearCanalPage,
  },
];

@NgModule({
  imports: [
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CrearCanalPage],
})
export class CrearCanalPageModule {}
