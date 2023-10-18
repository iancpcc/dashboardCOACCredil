import { AppStateEntity, DataState } from 'src/2.data/entities/app-state.entity';
import { Component, ViewChild } from '@angular/core';
import { Observable, Subject, catchError, map, of, startWith } from 'rxjs';

import { AgenciasService } from 'src/app/services/agencias.service';
import { DataTableDirective } from 'angular-datatables';
import { IAgencia } from 'src/app/interfaces/agencia.interface';
import { IUsuarioAgencia } from 'src/app/interfaces/usuario-agencia.interface';
import { ResponseEntity } from 'src/2.data/entities/response.entity';
import { Role } from 'src/app/interfaces/role.enum';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-situacion-crediticia',
  templateUrl: './situacion-crediticia.component.html',
  styleUrls: ['./situacion-crediticia.component.css']
})
export class SituacionCrediticiaComponent {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;

  // usuarios$: IUsuarioAgencia[] = [];
  readonly DataState = DataState;
  paramsToAPI={fechaCorte:'', agencia:0}

  reportState$: AppStateEntity<any[]> = {};
  isFirstCallAjax: boolean = true;
  dtOptions: any = {};
  dtTrigger = new Subject<any>();
  usuarios$!: Observable<ResponseEntity<IUsuarioAgencia[]>>;
  agencias$!: Observable<AppStateEntity<IAgencia[]>>;

  constructor( private agenciaService: AgenciasService,
    ){

    }

    ngOnInit(): void {
      this.agencias$ = this.obtenerAgencias$();
    }

    obtenerAgencias$(): Observable<AppStateEntity<IAgencia[]>> {
      return this.agenciaService.getAgenciesByUserLogged$().pipe(
        map((response) => {
          if (response.data && response.data.length > 1) {
            let consolidado = response.data.map((ag) => ag.id);
            response.data?.push({
              nombre: 'TODOS',
              id: consolidado.toString(),
            });
          }
          return { state: DataState.LOADED, data: response.data };
        }),
        startWith({ state: DataState.LOADING }),
        catchError((error) => {
          //
          return of({ state: DataState.ERROR, error });
        })
      );
    }



}
