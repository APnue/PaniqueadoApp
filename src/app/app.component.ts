import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Nosotros', url: '/nosotros', icon: 'people' },
    { title: 'Nuestros productos', url: '/productos', icon: 'cart' },
    { title: 'Nuestras tiendas', url: '/tiendas', icon: 'storefront' },
    { title: 'Ofertas especiales', url: '/ofertas', icon: 'pricetag' },
    { title: 'Contacto', url: '/contacto', icon: 'mail' },
  ];
  constructor() {}
}
