import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaDeProductosPage } from './lista-de-productos.page';

describe('ListaDeProductosPage', () => {
  let component: ListaDeProductosPage;
  let fixture: ComponentFixture<ListaDeProductosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
