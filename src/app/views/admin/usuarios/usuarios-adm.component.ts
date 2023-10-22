import {
  AppStateEntity,
  DataState,
} from 'src/2.data/entities/app-state.entity';
import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, catchError, map, of, startWith, tap } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { DataTableDirective } from 'angular-datatables';
import { IUsuario } from 'src/app/interfaces/usuario-agencia.interface';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios-adm',
  templateUrl: './usuarios-adm.component.html',
  styleUrls: ['./usuarios-adm.component.css'],
})
export class UsuariosAdmComponent implements OnInit, OnDestroy {
  dtElement: DataTableDirective | undefined;
  dtOptions: any = {};
  usuariosObtenidos: IUsuario[] = [];
  usuariosLimitados: IUsuario[] = [];
  numerosPagina: number[] = [];

  usuarios$!: Observable<AppStateEntity<IUsuario[]>>;
  currentPage = 1;
  readonly DataState = DataState;
  constructor(
    private srvUsuarios: UsuarioService,
    private srvAuth: AuthService
  ) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {

    this.obtenerUsuariosPorPagina(this.currentPage);
  }

  obtenerUsuariosPorPagina(page: number): void {

    this.usuarios$ = this.srvUsuarios.getAllUsers$(page).pipe(
      map((res) => {
        // debugger
        const {registros, totalPaginas, totalRegistros} = res.data!;
        this.usuariosObtenidos = registros!;
        this.usuariosLimitados = this.usuariosObtenidos.slice(0, 10);
        this.numerosPagina = Array.from({ length: totalPaginas }, (_, index) => index + 1);
        return { state: DataState.LOADED, data: res.data?.registros };
      }),
      startWith({ state: DataState.LOADING, data: [] }),
      catchError((err) => of({ state: DataState.ERROR, error: err }))
    );
  }

  trackByFn( index:number , item:any) {
    // debugger
    console.log("track by", item.usuario)
    return item.usuario; // Use a unique identifier for efficient tracking.
  }

  nextPage(numero:number) {

    console.log("click", numero)
    this.obtenerUsuariosPorPagina(numero)
  }

  modalRestablecerClave(usuario: string) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: 'No podrás reversar esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, restablecer!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvAuth
          .resetPassword$(usuario)
          .pipe(
            tap((res) => {
              Swal.fire(
                'Restablecida!',
                'La clave ha sido restablecida.',
                'success'
              );
            }),
            catchError((err) => {
              return Swal.fire(
                'Ocurrio un error!',
                `La clave no se ha restablecido. | ${err.error}`,
                'error'
              );
            })
          )
          .subscribe();
      }
    });
  }
}
