import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-productos.page.html',
  styleUrls: ['./agregar-productos.page.scss'],
  standalone: false
})
export class AgregarProductoPage {

  nombre = '';
  precio = '';
  id_categoria = '';

  constructor(private http: HttpClient, private alertCtrl: AlertController) {}

  insertarProducto() {
    const data = {
      nombre: this.nombre,
      precio: this.precio,
      id_categoria: this.id_categoria
    };

    this.http.post('https://paniqueado.atwebpages.com/api/insert_product.php', data)
      .subscribe(async (respuesta: any) => {
        if (respuesta.success) {
          const alert = await this.alertCtrl.create({
            header: 'Éxito',
            message: 'Producto insertado correctamente',
            buttons: ['OK']
          });
          await alert.present();
        } else {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'No se pudo insertar el producto',
            buttons: ['OK']
          });
          await alert.present();
        }
      });
  }
}
