import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialDePedidosPageRoutingModule } from './historial-de-pedidos-routing.module';

import { HistorialDePedidosPage } from './historial-de-pedidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialDePedidosPageRoutingModule
  ],
  declarations: [HistorialDePedidosPage]
})
export class HistorialDePedidosPageModule {}
