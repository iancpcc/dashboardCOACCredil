import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Role } from '../interfaces/role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  rolesPermitenDescargarReportes: Role[] = [
    Role.ADMIN,
    Role.ADMINISTRATIVO,
    Role.ASISTENTE_TECNOLOGIA,
    Role.COORDINADOR_TECNOLOGIA,
    Role.GERENTE
  ];

  constructor(private authSrv: AuthService) {}

  puedeDescargarReportes = () =>
    this.authSrv.roles.some((val) =>
      this.rolesPermitenDescargarReportes.includes(val)
    );
}
