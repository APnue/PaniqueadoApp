import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarProductoPage } from './editar-productos.page';

const routes: Routes = [
  {
    path: '',
    component: EditarProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarProductosPageRoutingModule {}
