import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {
  fechaActual: Date = new Date();

  usuario = {
    id: null,
    nombre: '',
    correo: '',
    telefono: '',
    recibir_notificaciones: false
  };

  apiUrl = 'https://paniqueado.atwebpages.com/api';

  constructor(private http: HttpClient, private toastCtrl: ToastController) { }

  ngOnInit() {
    // Actualizar fecha/hora cada segundo
    setInterval(() => {
      this.fechaActual = new Date();
    }, 1000);

    // Cargar usuario si existe id guardado
    const id = localStorage.getItem('usuario_id');
    if (id) {
      this.cargarUsuario(id);
    }
  }

  // Cargar usuario.
  cargarUsuario(id: string) {
  this.http.get(`${this.apiUrl}/consultar_usuario.php?id=${id}`).subscribe({
    next: (res: any) => {
      if (res.usuario) {
        this.usuario = res.usuario;
        // Asegurar que el checkbox funcione correctamente como booleano
        this.usuario.recibir_notificaciones = Boolean(Number(res.usuario.recibir_notificaciones));
      }
    },
    error: () => {
      this.mostrarToast('Error al cargar usuario');
    }
  });
}

  // Guardar usuario.
  async guardarUsuario() {
    if (!this.usuario.nombre || !this.usuario.correo) {
      this.mostrarToast('Nombre y correo son obligatorios');
      return;
    }

    if (this.usuario.id) {
      this.actualizarUsuario();
    } else {
      this.insertarUsuario();
    }
  }

  // Insertar nuevo usuario.
  insertarUsuario() {
    this.http.post(`${this.apiUrl}/insertar_usuario.php`, this.usuario).subscribe({
      next: (res: any) => {
        this.usuario.id = res.id;
        localStorage.setItem('usuario_id', String(this.usuario.id));
        this.mostrarToast('Usuario guardado');
      },
      error: () => {
        this.mostrarToast('Error al guardar usuario');
      }
    });
  }

  // Actualizar datos del usuario.
  actualizarUsuario() {
    this.http.put(`${this.apiUrl}/actualizar_usuario.php`, this.usuario).subscribe({
      next: () => {
        this.mostrarToast('Usuario actualizado');
      },
      error: () => {
        this.mostrarToast('Error al actualizar usuario');
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


  // Eliminar al usuario.
  eliminarUsuario() {
  if (!this.usuario.id) {
    this.mostrarToast('No hay usuario para eliminar');
    return;
  }

  if (confirm('¿Estás seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
    this.http.delete(`${this.apiUrl}/eliminar_usuario.php?id=${this.usuario.id}`).subscribe({
      next: () => {
        this.mostrarToast('Usuario eliminado');
        localStorage.removeItem('usuario_id');
        this.usuario = {
          id: null,
          nombre: '',
          correo: '',
          telefono: '',
          recibir_notificaciones: false
        };
      },
      error: () => {
        this.mostrarToast('Error al eliminar usuario');
      }
    });
  }
}
}
