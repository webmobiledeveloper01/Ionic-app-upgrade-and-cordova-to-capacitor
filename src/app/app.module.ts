import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { IonicStorageModule, Storage } from "@ionic/storage";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { Toast } from "@ionic-native/toast/ngx";
import { Push } from "@ionic-native/push/ngx";
import { Camera } from "@ionic-native/camera/ngx";
import { Stripe } from "@ionic-native/stripe/ngx";
import { FileChooser } from "@ionic-native/file-chooser/ngx";
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { Facebook } from "@ionic-native/facebook/ngx";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { GoogleMaps } from "@ionic-native/google-maps/ngx";
import { ModalEliminarpublicacionPageModule } from "./pages/modal-eliminarpublicacion/modal-eliminarpublicacion.module";
import { ModalReportarPageModule } from "./pages/modal-reportar/modal-reportar.module";
import { ModalReportarMotivoPageModule } from "./pages/modal-reportar-motivo/modal-reportar-motivo.module";
import { ModalInvitacionGrupoPageModule } from "./pages/modal-invitacion-grupo/modal-invitacion-grupo.module";
import { ModalReportarPublicacionPageModule } from "./pages/modal-reportar-publicacion/modal-reportar-publicacion.module";
import { ModalSolicitarGrupoPageModule } from "./pages/modal-solicitar-grupo/modal-solicitar-grupo.module";
import { NativeGeocoder } from "@ionic-native/native-geocoder/ngx";
import { ModalAjustesPageModule } from "./pages/modal-ajustes/modal-ajustes.module";
import { ModalBannersPageModule } from "./pages/modal-banners/modal-banners.module";
import { ModalInfoSponsorPageModule } from "./pages/modal-info-sponsor/modal-info-sponsor.module";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { Deeplinks } from "@ionic-native/deeplinks/ngx";
import { ModalInvitePageModule } from "./pages/modal-invite/modal-invite.module";
import { ModalSharePageModule } from "./pages/modal-share/modal-share.module";
import { ModalChangePageModule } from "./pages/modal-change/modal-change.module";
// import { File } from '@ionic-native/file';
import { File } from "@ionic-native/file/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { ModalLocalizacionPage } from "./pages/modal-localizacion/modal-localizacion.page";
import { ModalLocalizacionPageModule } from "./pages/modal-localizacion/modal-localizacion.module";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { ModalAjustarImagenPage } from "./pages/modal-ajustar-imagen/modal-ajustar-imagen.page";
import { ModalAjustarImagenPageModule } from "./pages/modal-ajustar-imagen/modal-ajustar-imagen.module";
import { Crop } from "@ionic-native/crop/ngx";
import { ImageCropperModule } from 'ngx-image-cropper';
import { SplashPageModule } from "./pages/splash/splash.module";
import { FullscreenImagePageModule } from "./fullscreen-image/fullscreen-image.module";
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    ImageCropperModule,
    SplashPageModule,
    FullscreenImagePageModule,
    ModalEliminarpublicacionPageModule,
    ModalReportarPageModule,
    ModalAjustarImagenPageModule,
    ModalSharePageModule,
    ModalReportarMotivoPageModule,
    ModalInvitacionGrupoPageModule,
    ModalReportarPublicacionPageModule,
    ModalSolicitarGrupoPageModule,
    ModalAjustesPageModule,
    ModalBannersPageModule,
    ModalInfoSponsorPageModule,
    ModalInvitePageModule,
    ModalChangePageModule,
    ModalLocalizacionPageModule,
  ],
  providers: [
    SocialSharing,
    FileChooser,
    Crop,
    Deeplinks,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Toast,
    Push,
    Camera,
    Stripe,
    File,
    FileTransfer,
    Facebook,
    GooglePlus,
    GoogleMaps,
    NativeGeocoder,
    Geolocation,
    InAppBrowser,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
