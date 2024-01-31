import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { PeticionajaxService } from './peticionajax.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {

  constructor(private ajax: PeticionajaxService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const estaAutenticado = this.ajax.estaUsuarioIniciadoSesion(); // Síncrono para obtener inmediatamente el estado de autenticación

    if (!estaAutenticado) {
      // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
      this.router.navigate(['/Inicio']);
      return false;
    }

    // Si el usuario está autenticado, permitir el acceso a la ruta
    return true;
  }
}