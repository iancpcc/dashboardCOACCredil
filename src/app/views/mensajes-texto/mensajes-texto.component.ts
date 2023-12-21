import { AppStateEntity, DataState } from 'src/data/entities/app-state.entity';
import { Component, ViewChild } from '@angular/core';
import { Observable, Subject, catchError, map, of, startWith, tap } from 'rxjs';

import { AgenciasService } from 'src/app/services/agencias.service';
import { AlertService } from 'src/app/utils/alert.service';
import { CuotasVencidas } from 'src/app/interfaces/IReportes/cuotas-vencidas.interface';
import { DataTableDirective } from 'angular-datatables';
import { HelpersService } from 'src/app/utils/helpers.service';
import { IAgencia } from 'src/app/interfaces/agencia.interface';
import { ISociosMora } from 'src/app/interfaces/IReportes/socios-mora.interface';
import { IUsuarioAgencia } from 'src/app/interfaces/usuario-agencia.interface';
import { ReportService } from 'src/app/services/report.service';
import { ResponseEntity } from 'src/data/entities/response.entity';
import { Role } from 'src/app/interfaces/role.enum';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mensajes-texto',
  templateUrl: './mensajes-texto.component.html',
  styleUrls: ['./mensajes-texto.component.css'],
})
export class MensajesTextoComponent {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;

  // usuarios$: IUsuarioAgencia[] = [];
  readonly DataState = DataState;
  // consultaCuotasVencidas: CuotasVencidas[] = []
  paramsToAPI: { fechaCorte: string | null; diasMora: number | null } = {
    fechaCorte: this.utils.obtenerFechaActual(),
    diasMora: 0,
  };

  reportState$: AppStateEntity<ISociosMora[]> = {};
  dtOptions: any = {};
  dtTrigger = new Subject<any>();

  usuarios$!: Observable<ResponseEntity<IUsuarioAgencia[]>>;
  agencias$!: Observable<AppStateEntity<IAgencia[]>>;

  constructor(
    private reportSrv: ReportService,
    private alertSrv: AlertService,
    private utils: HelpersService
  ) {}

  ngOnInit(): void {
    // this.agencias$ = this.obtenerAgencias$();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
      },
      // serverSide: true,
      responsive: true,
      ajax: ({}, callback: any) => {
        this.reportSrv
          .getSociosMora$(this.paramsToAPI)
          .pipe(
            map((response) => {
              return { state: DataState.LOADED, data: response.data };
            }),
            startWith({ state: DataState.LOADING, data: [] }),
            catchError((error) => {
              this.alertSrv.showAlertError(error.message);
              return of({ state: DataState.ERROR, error, data: [] });
            })
          )
          .subscribe(async (resp: AppStateEntity<ISociosMora[]>) => {
            this.reportState$ = resp;
            callback({
              recordsTotal: resp.data?.length,
              recordsFiltered: resp.data?.length,
              data: resp.data,
            });
          });

        // })
      },
      columns: [
        {
          title: 'Fecha Corte',
          data: 'fechacorte',
        },
        {
          title: 'Nombre',
          data: 'nombre',
        },
        {
          title: 'Apellido',
          data: 'apellido',
        },
        {
          title: 'Teléfonos',
          data: 'telefono',
        },
        {
          title: 'Garantes',
          data: 'garantes',
        },
        {
          title: 'Diasmoraactual',
          data: 'diasmoraactual',
        },
        {
          title: 'Estado',
          data: 'estado',
        },
        // {
        //   title: 'Saldo',
        //   data: 'saldo',
        // },
      ],
      dom: 'Bfrtip',
      buttons: ['copy', 'print', 'excel', 'pdf'],
    };


  }

  async reload() {
    let dt = await this.dtElement?.dtInstance;
    dt?.ajax.reload();
  }

  // obtenerAgencias$(): Observable<AppStateEntity<IAgencia[]>> {
  //   return this.agenciaService.getAgenciesByUserLogged$().pipe(
  //     map((response) => {
  //       if (response.data && response.data.length > 1) {
  //         let consolidado = response.data.map((ag) => ag.id);
  //         response.data?.push({
  //           nombre: 'TODOS',
  //           id: consolidado.toString(),
  //         });
  //       }
  //       return { state: DataState.LOADED, data: response.data };
  //     }),
  //     startWith({ state: DataState.LOADING }),
  //     catchError((error) => {
  //       //
  //       return of({ state: DataState.ERROR, error });
  //     })
  //   );
  // }

  async onSubmit() {
    await this.reload();
  }

  // obtenerUsuariosPorAgencia(event:any): void {
  //   let agencia = event.target.value
  //   const rolesId = `${(Role.ASESOR_CAPTACIONES, Role.GESTOR_CREDITO)}`;
  //   this.usuarios$ = this.usuarioSerice.getUsersByAgencies$({
  //     agencia,
  //     rolesId,
  //   })
  //   .pipe(
  //     map((response) => {
  //       response.data?.push({
  //         nombre: 'TODOS',
  //         usuario: null,
  //       });
  //       return { state: DataState.LOADED, data: response.data };
  //     })
  //   );
  // }

  // ngAfterViewInit(): void {
  //   this.dtTrigger.next(null);
  // }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

   parametrosOk() {
    return this.paramsToAPI.fechaCorte!=null && this.paramsToAPI.diasMora!=0;
  }
}
