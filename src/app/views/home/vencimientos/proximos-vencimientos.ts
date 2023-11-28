import { AppStateEntity, DataState } from 'src/data/entities/app-state.entity';
import { Component, ViewChild } from '@angular/core';
import { Observable, Subject, catchError, map, of, startWith } from 'rxjs';

import { AgenciasService } from 'src/app/services/agencias.service';
import { AlertService } from 'src/app/utils/alert.service';
import { AuthorizationService } from 'src/app/utils/authorization.service';
import { DataTableDirective } from 'angular-datatables';
import { IAgencia } from 'src/app/interfaces/agencia.interface';
import { IUsuarioAgencia } from 'src/app/interfaces/usuario-agencia.interface';
import { NINGUN_ITEM_SELECCIONADO_CONFIG } from 'src/base/config/rutas-app';
import { RPlazoFijo } from 'src/app/interfaces/IReportes/plazo-fijo.interface';
import { ReportService } from 'src/app/services/report.service';
import { ResponseEntity } from 'src/data/entities/response.entity';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-proximos-vencimientos',
  templateUrl: './proximos-vencimientos.html',
  styleUrls: ['./proximos-vencimientos.css'],
})
export class PlazoFijoComponent {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;

  // usuarios$: IUsuarioAgencia[] = [];
  readonly DataState = DataState;
  // consultaCuotasVencidas: CuotasVencidas[] = []
  NINGUN_ITEM_SELECCIONADO_ID = NINGUN_ITEM_SELECCIONADO_CONFIG;

  paramsToAPI = {
    codigoAgencias: this.NINGUN_ITEM_SELECCIONADO_ID,
    codigoAsesores: this.NINGUN_ITEM_SELECCIONADO_ID,
    diaFin: 7,
    diaInicio: 0,
  };

  reportState$: AppStateEntity<RPlazoFijo[]> = {};
  dtOptions: any = {};
  dtTrigger = new Subject<any>();

  usuarios$!: Observable<ResponseEntity<IUsuarioAgencia[]>>;
  agencias$!: Observable<AppStateEntity<IAgencia[]>>;

  constructor(
    private reportSrv: ReportService,
    private alertSrv: AlertService,
    private authorizationSrv: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
      },
      pageLength: 10,
      processing: true,
      order: [[8, 'asc']],
      // serverSide: true,
      responsive: true,
      ajax: ({}, callback: any) => {
        this.reportSrv
          .obtenerPlazoFijoPorAsesor$({ ...this.paramsToAPI })
          .pipe(
            map((response) => {
              return { state: DataState.LOADED, data: response.data };
            }),
            startWith({ state: DataState.LOADING, data: [] }),
            catchError((error) => {
              this.alertSrv.showAlertError(error.message);
              return of({ state: DataState.ERROR, error });
            })
          )
          .subscribe(async (resp: AppStateEntity<RPlazoFijo[]>) => {
            this.reportState$ = resp;
            callback({
              recordsTotal: resp.data?.length,
              recordsFiltered: resp.data?.length,
              data: resp.data,
            });
          });
      },
      columns: [
        {
          title: 'Cliente',
          data: 'cliente',
        },
        {
          title: 'Nombre',
          data: 'persona',
        },
        {
          title: 'Dirección',
          data: 'direccion',
          width: '40%',
        },
        {
          title: 'Coordenadas',
          data: 'coordenadas',
          render: function (data: any, type: any, row: any, meta: any) {
            data =
              '<a class="underline" target="_blank" href="https://maps.google.com/?q=' +
              data +
              '">' +
              data +
              '</a>';
            return data;
          },
        },
        {
          title: 'Teléfono',
          data: 'telefonos',
        },

        {
          title: 'Monto',
          data: 'monto',
        },
        {
          title: 'Plazo',
          data: 'plazo',
        },
        {
          title: 'Tasa',
          data: 'tasa',
        },
        {
          title: 'Fecha Vencimiento',
          data: 'fechavencimiento',
        },
        {
          title: 'Vence en(Días)',
          data: 'diasfaltantes',
        },
        {
          title: 'Asesor',
          data: 'nombre',
        },
        {
          title: 'Agencia',
          data: 'agencia',
        },
      ],
      dom: 'Bfrtip',
      buttons: [
        this.authorizationSrv.puedeDescargarReportes()
          ? ['copy', 'csv', 'excel', 'pdf', 'print']
          : [],
      ],
    };
  }

  async reload() {
    let dt = await this.dtElement?.dtInstance;
    dt?.ajax.reload();
  }

  async onSubmit(){
    await this.reload();
  }

  // ngAfterViewInit(): void {
  //   this.dtTrigger.next(null);
  // }
  asesorSeleccionado(event: any): void {
    this.paramsToAPI.codigoAsesores = event.codigo;
  }

  agenciaSeleccionada(event: any): void {
    this.paramsToAPI.codigoAgencias = event.codigo;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  parametrosOk = (): boolean =>
    this.paramsToAPI.codigoAgencias != this.NINGUN_ITEM_SELECCIONADO_ID &&
    this.paramsToAPI.codigoAsesores != this.NINGUN_ITEM_SELECCIONADO_ID;
}
