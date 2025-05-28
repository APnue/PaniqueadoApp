import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialDePedidosPage } from './historial-de-pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialDePedidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialDePedidosPageRoutingModule {}
