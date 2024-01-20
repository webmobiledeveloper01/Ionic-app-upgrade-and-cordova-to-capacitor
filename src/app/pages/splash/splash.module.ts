import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { SplashPage } from "./splash.page";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";

const routes: Routes = [
  {
    path: "",
    component: SplashPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  providers: [SplashScreen],
  declarations: [SplashPage],
})
export class SplashPageModule {}
