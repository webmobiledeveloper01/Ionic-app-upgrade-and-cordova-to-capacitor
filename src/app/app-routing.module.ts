import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'cover-page', loadChildren: () => import('./pages/cover-page/cover-page.module').then(m => m.CoverPagePageModule) },
  { path: 'logout', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule) },
  { path: 'home', canActivate: [AuthGuard], loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'details', canActivate: [AuthGuard], loadChildren: () => import('./pages/details/details.module').then(m => m.DetailsPageModule) },
  { path: 'profile', canActivate: [AuthGuard], loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule) },
  { path: 'forgot-password', canActivate: [AuthGuard], loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule) },
  { path: 'chats', canActivate: [AuthGuard], loadChildren: () => import('./pages/chats/chats.module').then(m => m.ChatsPageModule) },
  { path: 'interior-chat/:id_chat/:nombre_chat/:ultimo_mensaje', canActivate: [AuthGuard], loadChildren: () => import('./pages/interior-chat/interior-chat.module').then(m => m.InteriorChatPageModule) },
  { path: 'tabs', canActivate: [AuthGuard], loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'perfil', canActivate: [AuthGuard], loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilPageModule) },
  { path: 'mapp', canActivate: [AuthGuard], loadChildren: () => import('./pages/mapp/mapp.module').then(m => m.MappPageModule) },
  { path: 'fullscreen-image', canActivate: [AuthGuard], loadChildren: () => import('./fullscreen-image/fullscreen-image.module').then(m => m.FullscreenImagePageModule) },
  { path: 'canales-grupos',
      children:[
        {
          path:'',
          loadChildren:()=> import('./pages/canales-grupos/canales-grupos.module').then(m => m.CanalesGruposPageModule)
        },
        {
          path: ':canal_id',
          loadChildren:()=> import('./pages/grupo/grupo.module').then(m => m.GrupoPageModule)
        },
        {
          path: ':tipo/:deporte_id',
          loadChildren:()=> import('./pages/grupo/grupo.module').then(m=> m.GrupoPageModule)
        }
      ]
  },
  { path: 'grupo', loadChildren: ()=> import('./pages/grupo/grupo.module').then(m=>m.GrupoPageModule) },
  { path: 'memoria-colectiva', loadChildren: ()=> import('./pages/memoria-colectiva/memoria-colectiva.module').then(m=>m.MemoriaColectivaPageModule) },
  { path: 'memoria-pagina', loadChildren: ()=> import('./pages/memoria-pagina/memoria-pagina.module').then(m=>m.MemoriaPaginaPageModule) },
  { path: 'mapa-seleccion', loadChildren: ()=> import('./pages/mapa-seleccion/mapa-seleccion.module').then(m=>m.MapaSeleccionPageModule) },
  { path: 'landing', loadChildren: ()=> import('./pages/landing/landing.module').then(m=>m.LandingPageModule) },
  { path: 'mapa-street', loadChildren: ()=> import('./pages/mapa-street/mapa-street.module').then(m=>m.MapaStreetPageModule) },
  { path: 'modal-eliminarpublicacion', loadChildren: ()=> import('./pages/modal-eliminarpublicacion/modal-eliminarpublicacion.module').then(m=>m.ModalEliminarpublicacionPageModule) },
  { path: 'subir-contenido', loadChildren: ()=> import('./pages/subir-contenido/subir-contenido.module').then(m=>m.SubirContenidoPageModule) },
  { path: 'aviso-legal', loadChildren: ()=> import('./pages/aviso-legal/aviso-legal.module').then(m=>m.AvisoLegalPageModule) },
  { path: 'terminos-condiciones', loadChildren: ()=> import('./pages/terminos-condiciones/terminos-condiciones.module').then(m=>m.TerminosCondicionesPageModule) },
  { path: 'politica-privacidad', loadChildren: ()=> import('./pages/politica-privacidad/politica-privacidad.module').then(m=>m.PoliticaPrivacidadPageModule) },
  { path: 'modal-reportar', loadChildren: ()=> import('./pages/modal-reportar/modal-reportar.module').then(m=>m.ModalReportarPageModule) },
  { path: 'modal-reportar-publicacion', loadChildren: ()=> import('./pages/modal-reportar-publicacion/modal-reportar-publicacion.module').then(m=>m.ModalReportarPublicacionPageModule) },
  { path: 'modal-reportar-motivo', loadChildren: ()=> import('./pages/modal-reportar-motivo/modal-reportar-motivo.module').then(m=>m.ModalReportarMotivoPageModule) },
  { path: 'modal-invitacion-grupo/:id', loadChildren: ()=> import('./pages/modal-invitacion-grupo/modal-invitacion-grupo.module').then(m=>m.ModalInvitacionGrupoPageModule) },
  { path: 'modal-solicitar-grupo', loadChildren: ()=> import('./pages/modal-solicitar-grupo/modal-solicitar-grupo.module').then(m=>m.ModalSolicitarGrupoPageModule) },
  { path: 'pago', loadChildren: ()=> import('./pages/pago/pago.module').then(m=>m.PagoPageModule) },
  { path: 'pago-correcto', loadChildren: ()=> import('./pages/pago-correcto/pago-correcto.module').then(m=>m.PagoCorrectoPageModule) },
  { path: 'modal-ajustes', loadChildren: ()=> import('./pages/modal-ajustes/modal-ajustes.module').then(m=>m.ModalAjustesPageModule) },
  { path: 'modal-banners', loadChildren: ()=> import('./pages/modal-banners/modal-banners.module').then(m=>m.ModalBannersPageModule) },
  { path: 'pago-donacion', loadChildren: ()=> import('./pages/pago-donacion/pago-donacion.module').then(m=>m.PagoDonacionPageModule) },
  { path: 'crear-pin', loadChildren: ()=> import('./pages/crear-pin/crear-pin.module').then(m=>m.CrearPinPageModule) },
  { path: 'notification-user', loadChildren: ()=> import('./pages/notification-user/notification-user.module').then(m=>m.NotificationUserPageModule) },
  { path: 'modal-info-sponsor', loadChildren: ()=> import('./pages/modal-info-sponsor/modal-info-sponsor.module').then(m=>m.ModalInfoSponsorPageModule) },
  { path: 'detalle-publicacion/:id', loadChildren: ()=> import('./pages/detalle-publicacion/detalle-publicacion.module').then(m=>m.DetallePublicacionPageModule) },
  { path: 'crear-canal', loadChildren: ()=> import('./pages/crear-canal/crear-canal.module').then(m=>m.CrearCanalPageModule) },
  { path: 'add-members', loadChildren: ()=> import('./pages/add-members/add-members.module').then(m=>m.AddMembersPageModule) },
  { path: 'modal-invite', loadChildren: ()=> import('./pages/modal-invite/modal-invite.module').then(m=>m.ModalInvitePageModule) },
  { path: 'modal-share', loadChildren: ()=> import('./pages/modal-share/modal-share.module').then(m=>m.ModalSharePageModule) },
  { path: 'new-question', loadChildren: ()=> import('./pages/new-question/new-question.module').then(m=>m.NewQuestionPageModule) },
  { path: 'my-questions', loadChildren: ()=> import('./pages/my-questions/my-questions.module').then(m=>m.MyQuestionsPageModule) },
  { path: 'edit-question', loadChildren: ()=> import('./pages/edit-question/edit-question.module').then(m=>m.EditQuestionPageModule) },
  { path: 'answer-question', loadChildren: ()=> import('./pages/answer-question/answer-question.module').then(m=>m.AnswerQuestionPageModule) },
  { path: 'perfil-publico', loadChildren: ()=> import('./pages/perfil-publico/perfil-publico.module').then(m=>m.PerfilPublicoPageModule) },
  { path: 'perfil-banners', loadChildren: ()=> import('./pages/perfil-banners/perfil-banners.module').then(m=>m.PerfilBannersPageModule) },
  { path: 'buscador-publicaciones', loadChildren: ()=> import('./pages/buscador-publicaciones/buscador-publicaciones.module').then(m=>m.BuscadorPublicacionesPageModule) },
  { path: 'mis-recetas', loadChildren: ()=> import('./pages/mis-recetas/mis-recetas.module').then(m=>m.MisRecetasPageModule) },
  { path: 'subir-recetas', loadChildren: ()=> import('./pages/subir-recetas/subir-recetas.module').then(m=>m.SubirRecetasPageModule) },
  { path: 'detalle-recetas', loadChildren: ()=> import('./pages/detalle-recetas/detalle-recetas.module').then(m=>m.DetalleRecetasPageModule) },
  { path: 'editar-publicacion', loadChildren: ()=> import('./pages/editar-publicacion/editar-publicacion.module').then(m=>m.EditarPublicacionPageModule) },
  { path: 'modal-change', loadChildren: ()=> import('./pages/modal-change/modal-change.module').then(m=>m.ModalChangePageModule) },
  { path: 'seguidores', loadChildren: ()=> import('./pages/seguidores/seguidores.module').then(m=>m.SeguidoresPageModule) },
  { path: 'subir-banner', loadChildren: ()=> import('./pages/subir-banner/subir-banner.module').then(m=>m.SubirBannerPageModule) },
  { path: 'modal-localizacion', loadChildren: ()=> import('./pages/modal-localizacion/modal-localizacion.module').then(m=>m.ModalLocalizacionPageModule) },
  { path: 'mis-banners', loadChildren: ()=> import('./pages/mis-banners/mis-banners.module').then(m=>m.MisBannersPageModule) },
  { path: 'only-chanels', loadChildren: ()=> import('./pages/only-chanels/only-chanels.module').then(m=>m.OnlyChanelsPageModule) },
  { path: 'muro-proximidad', loadChildren: ()=> import('./pages/muro-proximidad/muro-proximidad.module').then(m=>m.MuroProximidadPageModule) },
  { path: 'geoask-pregunta-en-el-mapa', loadChildren: ()=> import('./pages/geoask-pregunta-en-el-mapa/geoask-pregunta-en-el-mapa.module').then(m=>m.GeoaskPreguntaEnElMapaPageModule) },
  { path: 'modal-ajustar-imagen', loadChildren: ()=> import('./pages/modal-ajustar-imagen/modal-ajustar-imagen.module').then(m=>m.ModalAjustarImagenPageModule) },
  { path: 'splash', loadChildren: ()=> import('./pages/splash/splash.module').then(m=>m.SplashPageModule) },
  { path: 'fullscreen-image', loadChildren: ()=> import('./fullscreen-image/fullscreen-image.module').then(m=>m.FullscreenImagePageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
