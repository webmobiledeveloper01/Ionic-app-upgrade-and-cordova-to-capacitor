import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { MuroProximidadPage } from "./muro-proximidad.page";
import { ComponentsModule } from "src/app/components/components.module";

const routes: Routes = [
  {
    path: "",
    component: MuroProximidadPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MuroProximidadPage],
})
export class MuroProximidadPageModule {}
