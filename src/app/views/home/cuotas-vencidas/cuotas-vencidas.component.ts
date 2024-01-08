import { AppStateEntity, DataState } from 'src/data/entities/app-state.entity';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IUsuario,
  IUsuarioAgencia,
} from 'src/app/interfaces/usuario-agencia.interface';
import { Observable, Subject, catchError, map, of, startWith, tap } from 'rxjs';

import { AlertService } from 'src/app/utils/alert.service';
import { CuotasVencidas } from 'src/app/interfaces/IReportes/cuotas-vencidas.interface';
import { DataTableDirective } from 'angular-datatables';
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import { HelpersService } from 'src/app/utils/helpers.service';
import { IAgencia } from 'src/app/interfaces/agencia.interface';
import { NINGUN_ITEM_SELECCIONADO_CONFIG } from 'src/base/config/rutas-app';
import { ReportService } from 'src/app/services/report.service';
import { ResponseEntity } from 'src/data/entities/response.entity';
import { excelDataCuotasVencidas } from 'src/app/interfaces/excelData.types';

@Component({
  selector: 'app-report-credits',
  templateUrl: './cuotas-vencidas.component.html',
  styleUrls: ['./cuotas-vencidas.component.css'],
})
export class CuotasVencidasComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;

  readonly DataState = DataState;
  NINGUN_ITEM_SELECCIONADO_ID = NINGUN_ITEM_SELECCIONADO_CONFIG;

  paramsToAPI = {
    fechaCorte: this.utils.obtenerFechaActual(),
    asesorId: this.NINGUN_ITEM_SELECCIONADO_ID,
    agenciasId: this.NINGUN_ITEM_SELECCIONADO_ID,
  };

  nombreAsesorSeleccionado = 'NINGUNO/A';
  nombreAgenciaSeleccionada = 'NINGUNA';

  listadoAgencias: IAgencia[] = [];
  listadoAsesores: IUsuario[] = [];

  reportState$: AppStateEntity<CuotasVencidas[]> = {};
  dtOptions: any = {};
  dtTrigger = new Subject<any>();
  // Columnas para el Datatable y para exportar a Excel
  titleColumns = [
    'Cliente',
    'Nombre Cliente',
    'Dirección',
    'Coordenadas',
    'Teléfono',
    'Saldo',
    'Saldos Vencidos',
    'Dias Mora',
    'Provisión',
    'Porcentaje Provisión',
    'Garantes',
    'Asesor',
  ];

  calculosReporte: {
    cartera?: number;
    colocacion?: number;
    morosidad?: number;
    socios?: number;
    sociosNuevos?: number;
    saldo?: number;
    saldoVencido?: number;
    provision?: number;
  } = {
    cartera: 0,
    colocacion: 0,
    morosidad: 0,
    socios: 0,
    sociosNuevos: 0,
    saldo: 0,
    saldoVencido: 0,
    provision: 0,
  };

  agenciaNombre = 'NINGUNA';

  usuarios$!: Observable<ResponseEntity<IUsuarioAgencia[]>>;
  agencias$!: Observable<AppStateEntity<IAgencia[]>>;

  constructor(
    private reportSrv: ReportService,
    private alertSrv: AlertService,
    private excelSrv: ExcelServiceService,
    private utils: HelpersService,
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      info: false,
      pageLength: 10,
      processing: true,
      bPaginate: false,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
      },
      // serverSide: true,
      responsive: true,
      ajax: ({}, callback: any) => {
        this.reportSrv
          .getCuotasVencidas$({ ...this.paramsToAPI })
          .pipe(
            map((response) => {
              if (response.data && response.data.length > 0) {
                let totalSaldo =
                  response.data
                    ?.map((r) => r.saldo)
                    .reduce((a, b) => a! + b!, 0) ?? 0;

                this.calculosReporte = {
                  cartera: response.data[0].scartera ?? 0,
                  colocacion: +(response.data[0].ncol ?? 0).toFixed(2),
                  socios: response.data[0].socios ?? 0,
                  sociosNuevos: response.data![0].sociosnuevos ?? 0,
                  morosidad: +(
                    (totalSaldo / response.data![0].scartera!) *
                    100
                  ).toFixed(2),
                };
              }
              return { state: DataState.LOADED, data: response.data };
            }),
            startWith({ state: DataState.LOADING, data: [] }),
            catchError((error) => {

                this.alertSrv.showAlertError(error.message);

              return of({ state: DataState.ERROR, error, data: [] });
            })
          )
          .subscribe((resp: AppStateEntity<CuotasVencidas[]>) => {
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
          title: this.titleColumns[0],
          data: 'numero',
        },
        {
          title: this.titleColumns[1],
          data: 'nombre',
        },
        {
          title: this.titleColumns[2],
          data: 'direccion1',
        },
        {
          title: this.titleColumns[3],
          data: 'coordenadas',
          render: function (data: any, type: any, row: any, meta: any) {
            //Estoy creando un hipervinculo hacia googlemaps con las ubicaciones
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
          title: this.titleColumns[4],
          data: 'telefono',
        },
        {
          title: this.titleColumns[5],
          data: 'saldo',
        },
        {
          title: this.titleColumns[6],
          data: 'saldosvencido',
          width: '5%',
        },
        {
          title: this.titleColumns[7],
          data: 'diasmoraactual',
          width: '5%',
        },
        {
          title: this.titleColumns[8],
          data: 'provision',
          width: '5%',
        },
        {
          title: this.titleColumns[9],
          data: 'porcentajeprovision',
          width: '5%',
        },
        {
          title: this.titleColumns[10],
          data: 'garantes',
        },
        {
          title: this.titleColumns[11],
          data: 'nombreusuario',
        },
      ],

      footerCallback: function () {
        let api = this.api();
        let totalSaldos = api
          .column(5)
          .data()
          .reduce((a: number, b: number) => a + b, 0)
          .toFixed(2);

        let totalSaldoVencido = api
          .column(6)
          .data()
          .reduce((a: number, b: number) => a + b, 0)
          .toFixed(2);

        let totalProvision = api
          .column(8)
          .data()
          .reduce((a: number, b: number) => a + b, 0)
          .toFixed(2);

        api.column(5).footer().innerHTML = totalSaldos;
        api.column(6).footer().innerHTML = totalSaldoVencido;
        api.column(8).footer().innerHTML = totalProvision;
      },
    };
  }
  // TODO: Mapear desde que obtenemos los datos en la api para optimizar recursos
  exportToExcel() {
    let newTable: CuotasVencidas[] = this.reportState$.data!.map(
      ({
        numero,
        nombre,
        direccion1,
        coordenadas,
        telefono,
        saldo,
        saldosvencido,
        diasmoraactual,
        provision,
        porcentajeprovision,
        garantes,
        nombreusuario
      }) => ({
        numero,
        nombre,
        direccion1,
        coordenadas,
        telefono,
        saldo,
        saldosvencido,
        diasmoraactual,
        provision,
        porcentajeprovision,
        garantes,
        nombreusuario
      })
    );

    let saldoTotal = newTable
      ?.reduce((a: number, b: CuotasVencidas) => a + b.saldo!, 0)
      .toFixed(2);
    let saldoVencido = newTable
      ?.reduce((a: number, b: CuotasVencidas) => a + b.saldosvencido!, 0)
      .toFixed(2);
    let provision = newTable
      ?.reduce((a: number, b: CuotasVencidas) => a + b.provision!, 0)
      .toFixed(2);

    let dataForExcel: any = [];
    newTable?.forEach((row: any) => {
      dataForExcel.push(Object.values(row));
    });
    //Agregro los calculos en la ultima fila
    dataForExcel.push([
      '', //1ra columna
      '',
      '',
      '',
      'Total', //a partir de la 5ta columna muestro los calculos
      saldoTotal,
      saldoVencido,
      '',
      provision,
      '',
    ]);
    //Cargo todos los parametros para enviar a contruir mi archivo en excel.
    let reportData: excelDataCuotasVencidas = {
      header: {
        title: 'CUOTAS VENCIDAS',
        agencia: this.nombreAgenciaSeleccionada,
        date: this.paramsToAPI.fechaCorte,
        asesor: this.nombreAsesorSeleccionado,
      },
      data: dataForExcel,
      titleColumns: this.titleColumns,
      footer: {
        cartera: this.calculosReporte.cartera!,
        colocacion: this.calculosReporte.colocacion!,
        morosidad: this.calculosReporte.morosidad!,
        sociosNuevos: this.calculosReporte.sociosNuevos!,
        socios: this.calculosReporte.socios!,
      },
    };

    this.excelSrv.exportExcel(reportData);
  }

  async reload() {
    let dt = await this.dtElement?.dtInstance;
    dt?.ajax.reload(); //Actualizo el datatable
  }

  async onSubmit() {
    await this.reload();
  }

  asesorSeleccionado(event: any) {
    this.paramsToAPI.asesorId = event.codigo;
    this.nombreAsesorSeleccionado = event.nombre;
  }

  agenciaSeleccionada(event: any) {
    this.paramsToAPI.agenciasId = event.codigo;
    this.nombreAgenciaSeleccionada = event.nombre;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  parametrosOk = (): boolean =>
    this.paramsToAPI.agenciasId != this.NINGUN_ITEM_SELECCIONADO_ID && this.paramsToAPI.asesorId != this.NINGUN_ITEM_SELECCIONADO_ID;
}
