import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogoCategoriasPage } from './catalogo-categorias.page';

describe('CatalogoCategoriasPage', () => {
  let component: CatalogoCategoriasPage;
  let fixture: ComponentFixture<CatalogoCategoriasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoCategoriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
