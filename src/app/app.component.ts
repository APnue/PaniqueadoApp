import { Component } from '@angular/core';
import { AuthService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public usuarioRol: string | null = null;

  public appPages = [
    { title: 'Inicio', url: '/folder/inbox', icon: 'home' },
    { title: 'Carrito', url: '/catalogo', icon: 'cart' },
    { title: 'Catálogo Completo', url: '/catalogo-categorias', icon: 'list' },
    { title: 'Lista de Productos', url: '/lista-de-productos', icon: 'list' },
    { title: 'Historial de Pedidos', url: '/historial-de-pedidos', icon: 'receipt' },
    { title: 'Agregar Productos', url: '/agregar-productos', icon: 'add-circle', role: 'admin' },
    { title: 'Editar Productos', url: '/editar-productos', icon: 'create', role: 'admin' },
    { title: 'Perfil', url: '/perfil', icon: 'settings' },
    { title: 'Acerca de Nosotros', url: '/nosotros', icon: 'information-circle' },
    { title: 'Contacto', url: '/contacto', icon: 'mail' },
  ];

  constructor(private auth: AuthService) {
    this.auth.rol$.subscribe((rol) => {
      this.usuarioRol = rol;
    });
  }
}
