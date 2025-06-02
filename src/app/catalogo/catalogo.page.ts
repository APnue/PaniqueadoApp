import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  standalone: false,
})
export class CatalogoPage {

  pedido: any[] = [];
  total: number = 0;

  constructor(private http: HttpClient, private toastCtrl: ToastController) { }

  ionViewWillEnter() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    try {
      const parsed = JSON.parse(carritoGuardado);
      if (Array.isArray(parsed)) {
        this.pedido = parsed.map((item: any) => ({
          ...item,
          precio: Number(item.precio),
          cantidad: Number(item.cantidad),
          subtotal: Number(item.subtotal)
        }));
      } else {
        this.pedido = [];
      }
    } catch (e) {
      console.error('Error al parsear el carrito:', e);
      this.pedido = [];
    }
    this.calcularTotal();
  }
}


  calcularTotal() {
  this.total = this.pedido.reduce((sum, item) => sum + Number(item.subtotal), 0);
}

  enviarPedido() {
    const id_usuario = localStorage.getItem('usuario_id');
    const datos = {
      id_usuario,
      total: this.total,
      productos: this.pedido
    };

    this.http.post(`https://paniqueado-api.onrender.com/api/hacer_pedido.php`, datos).subscribe({
      next: () => {
        this.pedido = [];
        this.total = 0;
        localStorage.removeItem('carrito'); // 🔄 TAMBIÉN CAMBIADO A 'carrito'
        this.mostrarToast('Pedido enviado con éxito');
      },
      error: () => {
        this.mostrarToast('Error al enviar el pedido');
      }
    });
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  eliminarProducto(index: number) {
  this.pedido.splice(index, 1); // elimina el producto en esa posición
  this.calcularTotal(); // actualiza el total
  localStorage.setItem('carrito', JSON.stringify(this.pedido)); // actualiza el localStorage
  this.mostrarToast('Producto eliminado del carrito');
}

}
