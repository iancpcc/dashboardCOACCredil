import { AppStateEntity, DataState } from 'src/data/entities/app-state.entity';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Observable, map } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { IUsuarioAgencia } from 'src/app/interfaces/usuario-agencia.interface';
import { Role } from 'src/app/interfaces/role.enum';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-selector-usuarios',
  templateUrl: './selector-usuarios.component.html',
  styleUrls: ['./selector-usuarios.component.css'],
})
export class SelectorUsuariosComponent implements OnChanges {
  usuarios$!: Observable<AppStateEntity<IUsuarioAgencia[]>>;

  readonly DataState = DataState;
  @Input() codAgenciaInput: string | null = null;
  @Output() asesorOutput = new EventEmitter<{}>();

  asesores: IUsuarioAgencia[] = [];

  rolesPermitidosParaVisualizarTodosAsesores = [
    Role.ADMIN,
    Role.GERENTE,
    Role.ADMINISTRATIVO,
    Role.JEFE_AGENCIA,
    Role.JEFE_NEGOCIOS,
  ];

  constructor(
    private usuarioSrv: UsuarioService,
    private authSrv: AuthService
  ) {}

  // ngOnDestroy(): void {
  //   throw new Error('Method not implemented.');
  // }
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    let currentValue = changes['codAgenciaInput'].currentValue;
    if (currentValue != null) {
      this.obtenerUsuariosPorAgencia(this.codAgenciaInput!);
    }
  }

  asesorSeleccionado(event: any) {
    let usuarioId = event.target.value;
    let asesor = this.asesores.find((val) => val.usuario == usuarioId)?.nombre!;
    this.asesorOutput.emit({
      codigo: usuarioId,
      nombre: asesor ?? 'NINGUNA/NINGUNO',
    });
  }

  obtenerUsuariosPorAgencia(codAgencia: string) {
    // Aqui van los roles de los usuarios que quiero llamar desde la api
    const roles = [Role.ASESOR_CAPTACIONES, Role.GESTOR_CREDITO,Role.GESTOR_DPF,Role.GESTOR_CAPTACIONES, Role.ASISTENTE_CREDITO, Role.JEFE_AGENCIA];
    const rolesId = roles.join(",");
    this.usuarios$ = this.usuarioSrv
      .getUsersByAgencies$({
        agencia: codAgencia,
        rolesId,
      })
      .pipe(
        map((response) => {
          if (response.success) {
            response.data?.push({
              nombre: 'TODOS',
              usuario: 'ALL-USERS',
            });

            this.asesores = this.cargarUsuariosSegunRol([...response.data!]);
            return { state: DataState.LOADED, data: this.asesores };
          }
          return { state: DataState.LOADED, data: [] };
        })
      );
  }

  cargarUsuariosSegunRol(asesores: IUsuarioAgencia[]): IUsuarioAgencia[] {
    let rolUsuarioLogueado = this.authSrv.roles;
    let codigoUsuarioLogueado = this.authSrv.userLogged;

    let tienePermisos = this.rolesPermitidosParaVisualizarTodosAsesores.some(
      (rol) => rolUsuarioLogueado.includes(rol)
    );

    if (tienePermisos) {
      return asesores;
    }

    return asesores.filter((user) => user.usuario == codigoUsuarioLogueado);
  }
}
