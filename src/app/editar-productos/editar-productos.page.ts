import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-productos.page.html',
  styleUrls: ['./editar-productos.page.scss'],
  standalone: false
})
export class EditarProductoPage {
  productos: any[] = [];
  productoSeleccionado: any = null;

  nombre = '';
  precio = '';
  id_categoria = '';

  constructor(private http: HttpClient, private alertCtrl: AlertController) {}

  ionViewWillEnter() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.http.get<any[]>('https://paniqueado-api.onrender.com/api/get_productos.php')
      .subscribe(data => {
        this.productos = data;
      });
  }

  seleccionarProducto(p: any) {
    this.productoSeleccionado = p;
    this.nombre = p.nombre;
    this.precio = p.precio;
    this.id_categoria = p.id_categoria;
  }

  actualizarProducto() {
    const data = {
      id: this.productoSeleccionado.id,
      nombre: this.nombre,
      precio: this.precio,
      id_categoria: this.id_categoria
    };

    this.http.post('https://paniqueado-api.onrender.com/api/update_product.php', data)
      .subscribe(async (res: any) => {
        const alert = await this.alertCtrl.create({
          header: res.success ? 'Éxito' : 'Error',
          message: res.success ? 'Producto actualizado correctamente' : 'No se pudo actualizar el producto',
          buttons: ['OK']
        });
        await alert.present();
        if (res.success) {
          this.productoSeleccionado = null;
          this.obtenerProductos();
        }
      });
  }
  
  eliminarProducto(id: number, event: Event) {
  event.stopPropagation(); // evita seleccionar el producto al hacer click en borrar

  if (confirm('¿Seguro que quieres eliminar este producto?')) {
    this.http.post('https://paniqueado-api.onrender.com/api/delete_product.php', { id })
      .subscribe(async (res: any) => {
        if(res.success) {
          alert('Producto eliminado');
          this.obtenerProductos(); // recarga la lista
        } else {
          alert('No se pudo eliminar el producto');
        }
      }, error => {
        console.error('Error al eliminar producto', error);
        alert('Error en la solicitud de eliminación');
      });
  }
}

}
