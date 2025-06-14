import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogoCategoriasPage } from './catalogo-categorias.page';

const routes: Routes = [
  {
    path: '',
    component: CatalogoCategoriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogoCategoriasPageRoutingModule {}
