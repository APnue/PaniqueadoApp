import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-historial-de-pedidos',
  templateUrl: './historial-de-pedidos.page.html',
  styleUrls: ['./historial-de-pedidos.page.scss'],
  standalone: false
})
export class HistorialDePedidosPage implements OnInit {
  pedidos: any[] = [];
  apiUrl = 'https://paniqueado.atwebpages.com/api';

  constructor(private http: HttpClient, private toastCtrl: ToastController) {}

  ngOnInit() {
    const id = localStorage.getItem('usuario_id');
    if (id) {
      this.cargarPedidos(id);
    } else {
      this.mostrarToast('No se encontró el ID del usuario');
    }
  }

  cargarPedidos(id: string) {
    this.http.get<any[]>(`${this.apiUrl}/historial_pedidos.php?id=${id}`).subscribe({
      next: data => {
        this.pedidos = data;
      },
      error: () => {
        this.mostrarToast('Error al cargar el historial de pedidos');
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
}
