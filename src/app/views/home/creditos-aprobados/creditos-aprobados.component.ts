import { AppStateEntity, DataState } from 'src/data/entities/app-state.entity';
import { Component, ViewChild } from '@angular/core';
import { Observable, Subject, catchError, map, of, startWith } from 'rxjs';

import { AgenciasService } from 'src/app/services/agencias.service';
import { AlertService } from 'src/app/utils/alert.service';
import { DataTableDirective } from 'angular-datatables';
import { HelpersService } from 'src/app/utils/helpers.service';
import { IAgencia } from 'src/app/interfaces/agencia.interface';
import { ICreditosAprobados } from 'src/app/interfaces/IReportes/creditos-aprobados';
import { ISituacioCrediticia } from 'src/app/interfaces/IReportes/situacion-crediticia.interface';
import { IUsuarioAgencia } from 'src/app/interfaces/usuario-agencia.interface';
import { NINGUN_ITEM_SELECCIONADO_CONFIG } from 'src/base/config/rutas-app';
import { ReportService } from 'src/app/services/report.service';
import { ResponseEntity } from 'src/data/entities/response.entity';

@Component({
  selector: 'app-creditos-aprobados',
  templateUrl: './creditos-aprobados.component.html',
  styleUrls: ['./creditos-aprobados.component.css']
})
export class CreditosAprobadosComponent {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;

  NINGUN_ITEM_SELECCIONADO_ID = NINGUN_ITEM_SELECCIONADO_CONFIG;

  readonly DataState = DataState;
  paramsToAPI = {
    fechaInicio: null,
    fechaFin: null,
  };

  reportState$: AppStateEntity<any[]> = {};
  // isFirstCallAjax: boolean = true;
  dtOptions: any = {};
  dtTrigger = new Subject<any>();
  usuarios$!: Observable<ResponseEntity<IUsuarioAgencia[]>>;
  agencias$!: Observable<AppStateEntity<IAgencia[]>>;

  constructor(
    private reportSrv: ReportService,
    private utilSrv: HelpersService,
    private alertSrv: AlertService
  ) {}

  ngOnInit(): void {
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
          .getCreditosAprobados$(this.paramsToAPI)
          .pipe(
            map((response) => {
              return { state: DataState.LOADED, data: response.data };
            }),
            startWith({ state: DataState.LOADING, data: [] }),
            catchError((error) => {
              // if (!this.isFirstCallAjax){ //Hago esta condicion para que no aparezca el error apenas se carga la página
              this.alertSrv.showAlertError(error.message);
              // }
              return of({ state: DataState.ERROR, error, data: [] });
            })
          )
          .subscribe((resp: AppStateEntity<ICreditosAprobados[]>) => {
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
          title: 'N° Solicitud',
          data: 'solicitud',
        },
        {
          title: 'Número',
          data: 'numero',
        },
        {
          title: 'Préstamo',
          data: 'tipoprestamo',
        },
        {
          title: 'Teléfonos',
          data: 'nombre',
        },
        {
          title: 'Estado',
          data: 'estado',
        },
        {
          title: 'Comentario',
          data: 'comentario',
        },
        {
          title: 'Usuario Aprueba',
          data: 'usuarioaprobacion',
        },
        {
          title: 'Fecha Aprobación',
          data: 'fechaaprobacion',
        },
        {
          title: 'Fecha Adjudicación',
          data: 'fechaadjudicacion',
        },
        {
          title: 'Deuda Inicial',
          data: 'deudainicial',
        },
        {
          title: 'Agencia',
          data: 'agencia',
        },
      ],
      dom: 'Bfrtip',
      buttons: ['copy', 'print', 'excel', 'pdf'],
    };
  }



  async reload() {
    let dt = await this.dtElement?.dtInstance;
    dt?.ajax.reload();
  }

  async onSubmit() {
    // this.isFirstCallAjax = false;
    await this.reload();
  }

  parametrosOk = (): boolean =>
    this.paramsToAPI.fechaInicio != null && this.paramsToAPI.fechaFin != null;

}
