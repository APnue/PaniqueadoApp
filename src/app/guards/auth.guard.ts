import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/usuario.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const isLoggedIn = this.auth.isAuthenticated();

    if (!isLoggedIn) {
      await this.router.navigate(['/perfil']);
      return false;
    }

    const expectedRole = route.data['expectedRole'];
    const userRole = localStorage.getItem('usuario_rol'); // Asegúrate de guardar este valor al iniciar sesión

    if (expectedRole && userRole !== expectedRole) {
      const alert = await this.alertController.create({
        header: 'Acceso denegado',
        message: 'No tienes permiso para acceder a esta página.',
        buttons: ['OK']
      });

      await alert.present();

      await this.router.navigate(['/folder/inbox']);
      return false;
    }

    return true;
  }
}
