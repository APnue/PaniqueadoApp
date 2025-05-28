import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarProductosPageRoutingModule } from './agregar-productos-routing.module';

import { AgregarProductoPage } from './agregar-productos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarProductosPageRoutingModule
  ],
  declarations: [AgregarProductoPage]
})
export class AgregarProductosPageModule {}
