import { AppStateEntity, DataState } from 'src/data/entities/app-state.entity';
import { Component, ViewChild } from '@angular/core';
import { Observable, Subject, catchError, map, of, startWith } from 'rxjs';

import { AgenciasService } from 'src/app/services/agencias.service';
import { AlertService } from 'src/app/utils/alert.service';
import { DataTableDirective } from 'angular-datatables';
import { IAgencia } from 'src/app/interfaces/agencia.interface';
import { ICumpleaniosSocios } from 'src/app/interfaces/IReportes/cumpleanios-socios.interface';
import { IUsuarioAgencia } from 'src/app/interfaces/usuario-agencia.interface';
import { NINGUN_ITEM_SELECCIONADO_CONFIG } from 'src/base/config/rutas-app';
import { ReportService } from 'src/app/services/report.service';
import { ResponseEntity } from 'src/data/entities/response.entity';

@Component({
  selector: 'app-cumpleanios-clientes',
  templateUrl: './cumpleanios-clientes.component.html',
  styleUrls: ['./cumpleanios-clientes.component.css'],
})
export class CumpleaniosClientesComponent {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;
  NINGUN_ITEM_SELECCIONADO_ID = NINGUN_ITEM_SELECCIONADO_CONFIG;
  // usuarios$: IUsuarioAgencia[] = [];
  readonly DataState = DataState;
  paramsToAPI = { idAgencia: this.NINGUN_ITEM_SELECCIONADO_ID , dias: 0 };

  reportState$: AppStateEntity<ICumpleaniosSocios[]> = {};
  isFirstCallAjax: boolean = true;
  dtOptions: any = {};
  dtTrigger = new Subject<any>();
  usuarios$!: Observable<ResponseEntity<IUsuarioAgencia[]>>;
  agencias$!: Observable<AppStateEntity<IAgencia[]>>;

  constructor(
    private reportSrv: ReportService,
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
          .getCumpleaniosSocios$({ ...this.paramsToAPI })
          .pipe(
            map((response) => {
              return { state: DataState.LOADED, data: response.data };
            }),
            startWith({ state: DataState.LOADING, data: [] }),
            catchError((error) => {
              if (!this.isFirstCallAjax) {
                //Hago esta condicion para que no aparezca el error apenas se carga la página
                this.alertSrv.showAlertError(error.message);
              }
              return of({ state: DataState.ERROR, error, data: [] });
            })
          )
          .subscribe((resp: AppStateEntity<ICumpleaniosSocios[]>) => {
            this.reportState$ = resp;
            if (this.isFirstCallAjax) {
              this.reportState$.state = undefined;
            }
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
          data: 'numero',
        },
        {
          title: 'Nombre',
          data: 'nombre',
        },
        {
          title: 'Fecha Nacimiento',
          data: 'fechanacimiento',
        },
        {
          title: 'Dirección',
          data: 'direccion',
        },
        {
          title: 'Telefonos',
          data: 'telefonos',
        },
        {
          title: 'Agencia',
          data: 'agencia',
        },
        {
          title: 'Asesor',
          data: 'asesor',
        },
        {
          title: 'Edad',
          data: 'edad',
        },
        {
          title: 'Dias',
          data: 'dias',
        },
      ],
      dom: 'Bfrtip',
      buttons: ['copy', 'print', 'excel', 'pdf'],
    };
  }

  agenciaSeleccionada(event: any) {
    this.paramsToAPI.idAgencia = event.codigo;
  }

  async reload() {
    let dt = await this.dtElement?.dtInstance;
    dt?.ajax.reload();
  }

  async onSubmit() {
    this.isFirstCallAjax = false;
    await this.reload();
  }

  parametrosOk = (): boolean =>
    this.paramsToAPI.idAgencia != this.NINGUN_ITEM_SELECCIONADO_ID  && this.paramsToAPI.dias >= 0;
}
