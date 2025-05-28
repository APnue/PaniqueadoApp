import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarProductosPageRoutingModule } from './editar-productos-routing.module';

import { EditarProductoPage } from './editar-productos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarProductosPageRoutingModule
  ],
  declarations: [EditarProductoPage]
})
export class EditarProductoPageModule {}
