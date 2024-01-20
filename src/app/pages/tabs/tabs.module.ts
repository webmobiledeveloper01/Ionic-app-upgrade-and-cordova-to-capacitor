import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'perfil', loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule) },
      { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule) },
      { path: 'chats', loadChildren: () => import('../chats/chats.module').then(m => m.ChatsPageModule) },
      { path: 'mapp', loadChildren: () => import('../mapp/mapp.module').then(m => m.MappPageModule) },
      { path: 'canales-grupos', loadChildren: () => import('../canales-grupos/canales-grupos.module').then(m => m.CanalesGruposPageModule) },
      { path: 'memoria-colectiva', loadChildren:()=>import('../memoria-colectiva/memoria-colectiva.module').then(m=>m.MemoriaColectivaPageModule)},
      { path: 'buscador-publicaciones', loadChildren: ()=>import('../buscador-publicaciones/buscador-publicaciones.module').then(m=>m.BuscadorPublicacionesPageModule) },
      { path: 'perfil-banners', loadChildren:() => import('../perfil-banners/perfil-banners.module').then(m => m.PerfilBannersPageModule) },
      { path: 'only-chanels', loadChildren:() => import('../only-chanels/only-chanels.module').then(m => m.OnlyChanelsPageModule) },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
