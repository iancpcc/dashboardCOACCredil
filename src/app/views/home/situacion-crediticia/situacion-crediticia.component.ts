import {
  AppStateEntity,
  DataState,
} from 'src/2.data/entities/app-state.entity';
import { Component, ViewChild } from '@angular/core';
import { Observable, Subject, catchError, map, of, startWith } from 'rxjs';

import { AgenciasService } from 'src/app/services/agencias.service';
import { AlertService } from 'src/app/utils/alert.service';
import { DataTableDirective } from 'angular-datatables';
import { HelpersService } from 'src/app/utils/helpers.service';
import { IAgencia } from 'src/app/interfaces/agencia.interface';
import { ISituacioCrediticia } from 'src/app/interfaces/IReportes/situacion-crediticia.interface';
import { IUsuarioAgencia } from 'src/app/interfaces/usuario-agencia.interface';
import { ReportService } from 'src/app/services/report.service';
import { ResponseEntity } from 'src/2.data/entities/response.entity';

@Component({
  selector: 'app-situacion-crediticia',
  templateUrl: './situacion-crediticia.component.html',
  styleUrls: ['./situacion-crediticia.component.css'],
})
export class SituacionCrediticiaComponent {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;

  // usuarios$: IUsuarioAgencia[] = [];
  readonly DataState = DataState;
  paramsToAPI = { fechaCorte: this.utilSrv.obtenerFechaActual() , codigoAgencias: '0' };

  reportState$: AppStateEntity<any[]> = {};
  isFirstCallAjax: boolean = true;
  dtOptions: any = {};
  dtTrigger = new Subject<any>();
  usuarios$!: Observable<ResponseEntity<IUsuarioAgencia[]>>;
  agencias$!: Observable<AppStateEntity<IAgencia[]>>;

  constructor(private agenciaService: AgenciasService,
    private reportSrv:ReportService,
    private utilSrv: HelpersService,
    private alertSrv:AlertService
    ) {}

  ngOnInit(): void {
    this.agencias$ = this.obtenerAgencias$();
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
          .getSituacionCrediticia$(this.paramsToAPI)
          .pipe(
            map((response) => {
              return { state: DataState.LOADED, data: response.data };
            }),
            startWith({ state: DataState.LOADING, data: [] }),
            catchError((error) => {
              if (!this.isFirstCallAjax){ //Hago esta condicion para que no aparezca el error apenas se carga la página

                this.alertSrv.showAlertError(error.message)
              }
              return of({ state: DataState.ERROR, error, data:[] });
            })
          )
          .subscribe((resp:AppStateEntity<ISituacioCrediticia[]>) => {
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
          title: 'Numero',
          data: 'numerocliente',
        },
        {
          title: 'Cliente',
          data: 'nombrecliente',
        },
        {
          title: 'Identificacion',
          data: 'identificacion',
        },
        {
          title: 'Teléfonos',
          data: 'telefonos',
        },
        {
          title: 'Operación',
          data: 'operacion',
        },
        {
          title: 'Tipo Prestamo',
          data: 'tipoprestamo',
        },
        {
          title: 'Agencia',
          data: 'nombreagencia',
        },
        {
          title: 'Fecha Adjudicación',
          data: 'fechaadjudicacion',
        },
        {
          title: 'AsesorOriginal',
          data: 'asesororiginal',
        },
        {
          title: 'AsesorActual',
          data: 'asesorcambio',
        },

      ],
      dom: 'Bfrtip',
      buttons: ['copy', 'print', 'excel', 'pdf'],
    };

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

  async reload() {
    let dt = await this.dtElement?.dtInstance;
    dt?.ajax.reload();
  }

  async onSubmit() {
    this.isFirstCallAjax = false;
    await this.reload();
  }

}
