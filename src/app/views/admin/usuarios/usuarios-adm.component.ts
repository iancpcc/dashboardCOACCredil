import { AppStateEntity, DataState } from 'src/data/entities/app-state.entity';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Subject,
  Subscription,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

import { AlertService } from 'src/app/utils/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { IUserLoggin } from '../../../interfaces/usuario-login.interface';
import { IUsuario } from 'src/app/interfaces/usuario-agencia.interface';
import { ResponseEntity } from 'src/data/entities/response.entity';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios-adm',
  templateUrl: './usuarios-adm.component.html',
  styleUrls: ['./usuarios-adm.component.css'],
})
export class UsuariosAdmComponent implements OnInit, OnDestroy {
  numerosPagina: number[] = [];
  nuevoUsuario: string = '';
  guardarUsuarioSuscription$!: Subscription;
  restablecerContraseniaSuscription$!: Subscription;
  usuariosState!: AppStateEntity<IUsuario[]>;
  isModalOpen = false;
  isPaginationInvisible = false;
  // currentPage = 0;
  readonly DataState = DataState;
  currentPageIndex: number = 0;
  searchTerms: Subject<string> = new Subject<string>();

  constructor(
    private srvUsuarios: UsuarioService,
    private srvAuth: AuthService,
    private srvAlert: AlertService
  ) {}

  ngOnDestroy(): void {
    this.guardarUsuarioSuscription$?.unsubscribe();
    this.searchTerms.unsubscribe();
    this.restablecerContraseniaSuscription$?.unsubscribe();
  }

  ngOnInit(): void {
    this.obtenerUsuariosPorPagina(this.currentPageIndex);
    this.onSearchUser();
  }

  onSearchUser(): void {
    this.searchTerms
      .pipe(
        debounceTime(1300), // Establece un retraso de 1300 ms
        distinctUntilChanged(), // Evita llamadas duplicadas para términos idénticos consecutivos
        tap(termino => this.isPaginationInvisible =  termino.length > 0  ),
        switchMap((term: string) => this.srvUsuarios.searchUsers$(term)),
        map((res) => ({ state: DataState.LOADED, data: res.data! })),
        startWith({ state: DataState.LOADING }),
        catchError((err) => of({ state: DataState.ERROR, error: err }))
      )
      .subscribe((responseMapped: AppStateEntity<IUsuario[]>) => {
        this.usuariosState = responseMapped;
      });
  }

  crearNuevoUsuario() {
    this.guardarUsuarioSuscription$ = this.srvUsuarios
      .saveUser$(this.nuevoUsuario)
      .pipe(
        tap((_) => {
          this.handleModal(); //Cierro el modal
          this.srvAlert.showAlertSucess('Usuario creado Exitosamente');
          this.obtenerUsuariosPorPagina(this.currentPageIndex); //Actualizo la tabla
        }),
        catchError((err: ResponseEntity<IUserLoggin>) => {
          return this.srvAlert.showAlertError(err?.message!);
        })
      )
      .subscribe();
  }

  obtenerUsuariosPorPagina(page: number): void {
    page = page + 1; //le sumo +1 ya que le nuestro index de paginación empieza en 0

    this.srvUsuarios
      .getAllUsers$(page)
      .pipe(
        map((res) => {
          const { registros, totalPaginas } = res.data!;
          this.numerosPagina = Array(totalPaginas).fill(0);
          return { state: DataState.LOADED, data: registros };
        }),
        startWith({ state: DataState.LOADING }),
        catchError((err) => of({ state: DataState.ERROR, error: err }))
      )
      .subscribe((response: AppStateEntity<IUsuario[]>) => {
        this.usuariosState = response;
        if (response.state == DataState.ERROR) {
          this.srvAlert.showAlertError(response.error?.message!);
        }
      });
  }

  handleUsersData(event: any): void {
    let terminoBusqueda = event.target.value as string;
    // debugger
    if (terminoBusqueda.trim().length <= 0) {
      this.obtenerUsuariosPorPagina(this.currentPageIndex);
      this.isPaginationInvisible = false;
    } else {
      this.searchTerms.next(terminoBusqueda);
    }
  }

  handleModal() {
    this.isModalOpen = !this.isModalOpen;
    this.nuevoUsuario = '';
  }

  nextPage(numero: number) {
    this.currentPageIndex = numero;
    this.obtenerUsuariosPorPagina(numero);
  }

  movePage(direccion: string) {
    this.currentPageIndex += direccion === 'siguiente' ? 1 : -1;
    this.obtenerUsuariosPorPagina(this.currentPageIndex);
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
        this.restablecerContraseniaSuscription$ = this.srvAuth
          .resetPassword$(usuario)
          .pipe(
            tap((res) => {
              Swal.fire(
                'Restablecida!',
                'La clave ha sido restablecida.',
                'success'
              );
            }),
            shareReplay(1),
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
