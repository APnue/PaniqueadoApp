import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaDeProductosPageRoutingModule } from './lista-de-productos-routing.module';

import { ListaDeProductosPage } from './lista-de-productos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaDeProductosPageRoutingModule
  ],
  declarations: [ListaDeProductosPage]
})
export class ListaDeProductosPageModule {}
