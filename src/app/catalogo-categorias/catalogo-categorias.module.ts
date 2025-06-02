import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatalogoCategoriasPageRoutingModule } from './catalogo-categorias-routing.module';

import { CatalogoCategoriasPage } from './catalogo-categorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogoCategoriasPageRoutingModule
  ],
  declarations: [CatalogoCategoriasPage]
})
export class CatalogoCategoriasPageModule {}
