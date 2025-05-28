import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarProductoPage } from './agregar-productos.page';

describe('AgregarProductosPage', () => {
  let component: AgregarProductoPage;
  let fixture: ComponentFixture<AgregarProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
