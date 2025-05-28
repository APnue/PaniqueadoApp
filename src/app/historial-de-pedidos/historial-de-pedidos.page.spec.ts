import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialDePedidosPage } from './historial-de-pedidos.page';

describe('HistorialDePedidosPage', () => {
  let component: HistorialDePedidosPage;
  let fixture: ComponentFixture<HistorialDePedidosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialDePedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
