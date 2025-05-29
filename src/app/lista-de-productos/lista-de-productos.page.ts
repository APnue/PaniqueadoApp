import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-lista-de-productos',
  templateUrl: './lista-de-productos.page.html',
  styleUrls: ['./lista-de-productos.page.scss'],
  standalone: false
})
export class ListaDeProductosPage implements OnInit {
  categorias: any[] = [];
  productos: any[] = [];
  categoriaSeleccionada: number | null = null;
  apiUrl = 'https://paniqueado.atwebpages.com/api';

  constructor(private http: HttpClient, private toastCtrl: ToastController) {}

  ngOnInit() {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.http.get<any[]>(`${this.apiUrl}/listar_categorias.php`).subscribe({
      next: (data) => this.categorias = data,
      error: () => this.mostrarToast('Error al cargar categorías')
    });
  }

  seleccionarCategoria(idCategoria: number) {
    this.categoriaSeleccionada = idCategoria;
    this.http.get<any[]>(`${this.apiUrl}/productos_por_categoria.php?id=${idCategoria}`).subscribe({
      next: (data) => this.productos = data,
      error: () => this.mostrarToast('Error al cargar productos')
    });
  }

  agregarAlCarrito(producto: any) {
    let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

    const index = carrito.findIndex((p: any) => p.id === producto.id);
    if (index !== -1) {
      carrito[index].cantidad += 1;
      carrito[index].subtotal += Number(producto.precio);
    } else {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: Number(producto.precio),
        cantidad: 1,
        subtotal: Number(producto.precio)
      });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    this.mostrarToast('Producto añadido al carrito');
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
