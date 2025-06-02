import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage {
  fechaActual: Date = new Date();

  estado: 'login' | 'registro' | 'perfil' = 'login';
  loginCorreo: string = '';

  usuario = {
    id: null,
    nombre: '',
    correo: '',
    telefono: '',
    recibir_notificaciones: false
  };

  constructor(private http: HttpClient, private toastCtrl: ToastController, private router: Router, private authService: AuthService) {
    setInterval(() => {
      this.fechaActual = new Date();
    }, 1000);
  }

  ionViewWillEnter() {
    const id = localStorage.getItem('usuario_id');
    if (id) {
      this.estado = 'perfil';
      this.cargarUsuario(id);
    } else {
      this.estado = 'login';
      this.usuario = {
        id: null,
        nombre: '',
        correo: '',
        telefono: '',
        recibir_notificaciones: false
      };
      this.loginCorreo = '';
    }
  }

  cambiarEstado(nuevoEstado: 'login' | 'registro' | 'perfil') {
    this.estado = nuevoEstado;
    if (nuevoEstado === 'registro') {
      this.usuario = {
        id: null,
        nombre: '',
        correo: '',
        telefono: '',
        recibir_notificaciones: false
      };
    }
    if (nuevoEstado === 'login') {
      this.loginCorreo = '';
    }
  }

  iniciarSesion() {
  if (!this.loginCorreo) {
    this.mostrarToast('Por favor, ingresa tu correo');
    return;
  }

  this.http.get(`https://paniqueado-api.onrender.com/api/buscar_usuario_por_correo.php?correo=${encodeURIComponent(this.loginCorreo)}`)
    .subscribe({
      next: (res: any) => {
        console.log('Respuesta login:', res);
        if (res.usuario && res.usuario.id) {
          // Guardar datos de usuario en localStorage
          localStorage.setItem('usuario_id', res.usuario.id);
          localStorage.setItem('usuario_rol', res.usuario.rol);  // ← IMPORTANTE
          this.authService.setRol(res.usuario.rol);
          this.usuario = res.usuario;
          this.estado = 'perfil'; // Cambiar a vista perfil
          this.mostrarToast('Inicio de sesión exitoso');
        } else {
          this.mostrarToast('Correo no encontrado, por favor regístrate');
        }
      },
      error: (err) => {
        console.error('Error login:', err);
        this.mostrarToast('Error al iniciar sesión');
      }
    });
}

  cargarUsuario(id: string) {
    this.http.get(`https://paniqueado-api.onrender.com/api/consultar_usuario.php?id=${id}`).subscribe({
      next: (res: any) => {
        if (res.usuario) {
          this.usuario = res.usuario;
          this.usuario.recibir_notificaciones = Boolean(Number(res.usuario.recibir_notificaciones));
        }
      },
      error: () => {
        this.mostrarToast('Error al cargar usuario');
      }
    });
  }

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

  insertarUsuario() {
    this.http.post(`https://paniqueado-api.onrender.com/api/insertar_usuario.php`, this.usuario).subscribe({
      next: (res: any) => {
        this.usuario.id = res.id;
        localStorage.setItem('usuario_id', String(this.usuario.id));
        this.estado = 'perfil';
        this.mostrarToast('Cuenta creada con éxito');
      },
      error: () => {
        this.mostrarToast('Error al guardar usuario');
      }
    });
  }

  actualizarUsuario() {
    this.http.put(`https://paniqueado-api.onrender.com/api/actualizar_usuario.php`, this.usuario).subscribe({
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

  eliminarUsuario() {
    if (!this.usuario.id) {
      this.mostrarToast('No hay usuario para eliminar');
      return;
    }

    if (confirm('¿Estás seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      this.http.delete(`https://paniqueado-api.onrender.com/api/eliminar_usuario.php?id=${this.usuario.id}`).subscribe({
        next: () => {
          this.mostrarToast('Usuario eliminado');
          localStorage.removeItem('usuario_id');
          this.estado = 'login';
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

  cerrarSesion() {
  localStorage.removeItem('usuario_id');
  this.usuario = {
    id: null,
    nombre: '',
    correo: '',
    telefono: '',
    recibir_notificaciones: false
  };
  this.estado = 'login';
  this.mostrarToast('Sesión cerrada');
  this.router.navigate(['/folder/inbox']);
  this.authService.clearRol();
}
}
