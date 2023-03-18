import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { CuentaService } from '../services/cuenta.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private cuentaService: CuentaService){

  }
  canActivate(): Observable<boolean>  {
    return this.cuentaService.currentUser$.pipe(
      map(user => {
        if(user) return true;
        Swal.fire({
          icon: 'error',
          title: 'Favor iniciar sesión'
        });
        return false;
      })
    );
  }
}
