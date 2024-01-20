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
  { path: 'grupo', loadChildren: './pages/grupo/grupo.module#GrupoPageModule' },
  { path: 'memoria-colectiva', loadChildren: './pages/memoria-colectiva/memoria-colectiva.module#MemoriaColectivaPageModule' },
  { path: 'memoria-pagina', loadChildren: './pages/memoria-pagina/memoria-pagina.module#MemoriaPaginaPageModule' },
  { path: 'mapa-seleccion', loadChildren: './pages/mapa-seleccion/mapa-seleccion.module#MapaSeleccionPageModule' },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  { path: 'mapa-street', loadChildren: './pages/mapa-street/mapa-street.module#MapaStreetPageModule' },
  { path: 'modal-eliminarpublicacion', loadChildren: './pages/modal-eliminarpublicacion/modal-eliminarpublicacion.module#ModalEliminarpublicacionPageModule' },
  { path: 'subir-contenido', loadChildren: './pages/subir-contenido/subir-contenido.module#SubirContenidoPageModule' },
  { path: 'aviso-legal', loadChildren: './pages/aviso-legal/aviso-legal.module#AvisoLegalPageModule' },
  { path: 'terminos-condiciones', loadChildren: './pages/terminos-condiciones/terminos-condiciones.module#TerminosCondicionesPageModule' },
  { path: 'politica-privacidad', loadChildren: './pages/politica-privacidad/politica-privacidad.module#PoliticaPrivacidadPageModule' },
  { path: 'modal-reportar', loadChildren: './pages/modal-reportar/modal-reportar.module#ModalReportarPageModule' },
  { path: 'modal-reportar-publicacion', loadChildren: './pages/modal-reportar-publicacion/modal-reportar-publicacion.module#ModalReportarPublicacionPageModule' },
  { path: 'modal-reportar-motivo', loadChildren: './pages/modal-reportar-motivo/modal-reportar-motivo.module#ModalReportarMotivoPageModule' },
  { path: 'modal-invitacion-grupo/:id', loadChildren: './pages/modal-invitacion-grupo/modal-invitacion-grupo.module#ModalInvitacionGrupoPageModule' },
  { path: 'modal-solicitar-grupo', loadChildren: './pages/modal-solicitar-grupo/modal-solicitar-grupo.module#ModalSolicitarGrupoPageModule' },
  { path: 'pago', loadChildren: './pages/pago/pago.module#PagoPageModule' },
  { path: 'pago-correcto', loadChildren: './pages/pago-correcto/pago-correcto.module#PagoCorrectoPageModule' },
  { path: 'modal-ajustes', loadChildren: './pages/modal-ajustes/modal-ajustes.module#ModalAjustesPageModule' },
  { path: 'modal-banners', loadChildren: './pages/modal-banners/modal-banners.module#ModalBannersPageModule' },
  { path: 'pago-donacion', loadChildren: './pages/pago-donacion/pago-donacion.module#PagoDonacionPageModule' },
  { path: 'crear-pin', loadChildren: './pages/crear-pin/crear-pin.module#CrearPinPageModule' },
  { path: 'notification-user', loadChildren: './pages/notification-user/notification-user.module#NotificationUserPageModule' },
  { path: 'modal-info-sponsor', loadChildren: './pages/modal-info-sponsor/modal-info-sponsor.module#ModalInfoSponsorPageModule' },
  { path: 'detalle-publicacion/:id', loadChildren: './pages/detalle-publicacion/detalle-publicacion.module#DetallePublicacionPageModule' },
  { path: 'crear-canal', loadChildren: './pages/crear-canal/crear-canal.module#CrearCanalPageModule' },
  { path: 'add-members', loadChildren: './pages/add-members/add-members.module#AddMembersPageModule' },
  { path: 'modal-invite', loadChildren: './pages/modal-invite/modal-invite.module#ModalInvitePageModule' },
  { path: 'modal-share', loadChildren: './pages/modal-share/modal-share.module#ModalSharePageModule' },
  { path: 'new-question', loadChildren: './pages/new-question/new-question.module#NewQuestionPageModule' },
  { path: 'my-questions', loadChildren: './pages/my-questions/my-questions.module#MyQuestionsPageModule' },
  { path: 'edit-question', loadChildren: './pages/edit-question/edit-question.module#EditQuestionPageModule' },
  { path: 'answer-question', loadChildren: './pages/answer-question/answer-question.module#AnswerQuestionPageModule' },
  { path: 'perfil-publico', loadChildren: './pages/perfil-publico/perfil-publico.module#PerfilPublicoPageModule' },
  { path: 'perfil-banners', loadChildren: './pages/perfil-banners/perfil-banners.module#PerfilBannersPageModule' },
  { path: 'buscador-publicaciones', loadChildren: './pages/buscador-publicaciones/buscador-publicaciones.module#BuscadorPublicacionesPageModule' },
  { path: 'mis-recetas', loadChildren: './pages/mis-recetas/mis-recetas.module#MisRecetasPageModule' },
  { path: 'subir-recetas', loadChildren: './pages/subir-recetas/subir-recetas.module#SubirRecetasPageModule' },
  { path: 'detalle-recetas', loadChildren: './pages/detalle-recetas/detalle-recetas.module#DetalleRecetasPageModule' },
  { path: 'editar-publicacion', loadChildren: './pages/editar-publicacion/editar-publicacion.module#EditarPublicacionPageModule' },
  { path: 'modal-change', loadChildren: './pages/modal-change/modal-change.module#ModalChangePageModule' },
  { path: 'seguidores', loadChildren: './pages/seguidores/seguidores.module#SeguidoresPageModule' },
  { path: 'subir-banner', loadChildren: './pages/subir-banner/subir-banner.module#SubirBannerPageModule' },
  { path: 'modal-localizacion', loadChildren: './pages/modal-localizacion/modal-localizacion.module#ModalLocalizacionPageModule' },
  { path: 'mis-banners', loadChildren: './pages/mis-banners/mis-banners.module#MisBannersPageModule' },
  { path: 'only-chanels', loadChildren: './pages/only-chanels/only-chanels.module#OnlyChanelsPageModule' },
  { path: 'muro-proximidad', loadChildren: './pages/muro-proximidad/muro-proximidad.module#MuroProximidadPageModule' },
  { path: 'geoask-pregunta-en-el-mapa', loadChildren: './pages/geoask-pregunta-en-el-mapa/geoask-pregunta-en-el-mapa.module#GeoaskPreguntaEnElMapaPageModule' },
  { path: 'modal-ajustar-imagen', loadChildren: './pages/modal-ajustar-imagen/modal-ajustar-imagen.module#ModalAjustarImagenPageModule' },
  { path: 'splash', loadChildren: './pages/splash/splash.module#SplashPageModule' },
  { path: 'fullscreen-image', loadChildren: './fullscreen-image/fullscreen-image.module#FullscreenImagePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
