import { AppStateEntity, DataState } from 'src/2.data/entities/app-state.entity';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable, catchError, map, of, startWith, tap } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { DataTableDirective } from 'angular-datatables';
import { IUsuario } from 'src/app/interfaces/usuario-agencia.interface';
import { ResponseEntity } from 'src/2.data/entities/response.entity';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { error } from 'jquery';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.css'],
})
export class SeguridadComponent implements OnInit {
  dtElement: DataTableDirective | undefined;
  @ViewChild('btnEdit') btnEditar!: TemplateRef<any>;
  @ViewChild('btnDelete') btnEliminar!: TemplateRef<any>;
  dtOptions: any = {};

  usuarios$!: Observable<AppStateEntity<IUsuario[]>> ;
  readonly DataState = DataState;
  constructor(
    private srvUsuarios: UsuarioService,
    private srvAuth: AuthService
  ) {}
  ngOnInit(): void {
    this.usuarios$ = this.srvUsuarios.getAllUsers$().pipe(
      map((res) => {return { state: DataState.LOADED, data: res.data }}),
      startWith({ state: DataState.LOADING, data: [] }),
      catchError((err) => of({ state: DataState.ERROR, error: err }))
    );


  }
  modalRestablecerClave(usuario:string) {
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
        this.srvAuth.resetPassword$(usuario).pipe(
          tap((res) => {

            Swal.fire(
              'Restablecida!',
              'La clave ha sido restablecida.',
              'success'
            );
          }),
          catchError((err) => {

            return Swal.fire(
              'Restablecida!',
              'La clave no se ha restablecido. | err.error',
              'error'
            );
          })
        ).subscribe();
      }
    });
  }
}
