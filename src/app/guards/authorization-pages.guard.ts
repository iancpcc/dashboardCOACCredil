import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable, inject } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationPagesGuard implements CanActivate {
  private service = inject(AuthService);
  private router = inject(Router);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (route.component && route.data) {
      let permissions = route.data['roles'] as Role[];
      if (permissions) {
        let hasPermission = this.service.roles.some((role) =>
          permissions.includes(role)
        );

        if (hasPermission) {
          return true;
        }
        return this.router.navigate(['/accesso-no-autorizado'], {
          replaceUrl: true,
        });
      }
      return true;
    }

    return true;
  }
}
