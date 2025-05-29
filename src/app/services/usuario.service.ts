import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rolSubject = new BehaviorSubject<string | null>(localStorage.getItem('usuario_rol'));
  public rol$ = this.rolSubject.asObservable();

  constructor() {}

  setRol(rol: string) {
    localStorage.setItem('usuario_rol', rol);
    this.rolSubject.next(rol);
  }

  clearRol() {
    localStorage.removeItem('usuario_rol');
    this.rolSubject.next(null);
  }

  getRol(): string | null {
    return localStorage.getItem('usuario_rol');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('usuario_id') !== null;
  }
}
