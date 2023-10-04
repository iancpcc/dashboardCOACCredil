import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ApplicationRef, Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { AlertService } from '../utils/alert.service';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivateChild {
  constructor(
    private _authService: AuthService,
    private _route: Router,
    private _alertSrv:AlertService
  ) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    //If token is null redirecto to login and emmit false
    if (this._authService.isLoggedIn && !this._authService.isTokenExpired  ) {
      return true;
    }
    if (this._authService.isLoggedIn){
      this._alertSrv.showAlertError("Sesión caducada, Vuelva a ingresar")
    }
    this._authService.isAuthenticated$.emit(false);
    this._route.navigateByUrl('/login');
    return false;

  }
}
