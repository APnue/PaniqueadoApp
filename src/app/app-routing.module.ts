import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'catalogo',
    loadChildren: () => import('./catalogo/catalogo.module').then(m => m.CatalogoPageModule)
  },
  {
    path: 'agregar-productos',
    loadChildren: () => import('./agregar-productos/agregar-productos.module').then(m => m.AgregarProductosPageModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin' }
  },
  {
    path: 'editar-productos',
    loadChildren: () => import('./editar-productos/editar-productos.module').then(m => m.EditarProductoPageModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin' }
  },
  {
    path: 'lista-de-productos',
    loadChildren: () => import('./lista-de-productos/lista-de-productos.module').then(m => m.ListaDeProductosPageModule),
  },
  {
    path: 'nosotros',
    loadChildren: () => import('./nosotros/nosotros.module').then(m => m.NosotrosPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./contacto/contacto.module').then(m => m.ContactoPageModule)
  },
  {
    path: 'historial-de-pedidos',
    loadChildren: () => import('./historial-de-pedidos/historial-de-pedidos.module').then(m => m.HistorialDePedidosPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },  {
    path: 'catalogo-categorias',
    loadChildren: () => import('./catalogo-categorias/catalogo-categorias.module').then( m => m.CatalogoCategoriasPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
