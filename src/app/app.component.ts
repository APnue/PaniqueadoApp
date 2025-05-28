import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/folder/inbox', icon: 'home' },
    { title: 'Catálogo de Productos', url: '/catalogo', icon: 'cart' },
    { title: 'Agregar Productos', url: '/agregar-productos', icon: 'add-circle' },
    { title: 'Editar Productos', url: '/editar-productos', icon: 'create' },
    { title: 'Lista de Productos', url: '/lista-de-productos', icon: 'list' },
    { title: 'Historial de Pedidos', url: '/historial-de-pedidos', icon: 'receipt' },
    { title: 'Perfil / Ajustes', url: '/perfil', icon: 'settings' },
    { title: 'Acerca de Nosotros', url: '/nosotros', icon: 'information-circle' },
    { title: 'Contacto', url: '/contacto', icon: 'mail' },
  ];

  constructor() {}
}
