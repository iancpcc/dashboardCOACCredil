import {
  AppStateEntity,
  DataState,
} from 'src/2.data/entities/app-state.entity';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IUsuario, IUsuarioAgencia } from 'src/app/interfaces/usuario-agencia.interface';
import { Observable, Subject, catchError, map, of, startWith, tap } from 'rxjs';

import { AgenciasService } from 'src/app/services/agencias.service';
import { AlertService } from 'src/app/utils/alert.service';
import { CuotasVencidas } from 'src/app/interfaces/IReportes/cuotas-vencidas.interface';
import { DataTableDirective } from 'angular-datatables';
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import { HelpersService } from 'src/app/utils/helpers.service';
import { IAgencia } from 'src/app/interfaces/agencia.interface';
import { ReportService } from 'src/app/services/report.service';
import { ResponseEntity } from 'src/2.data/entities/response.entity';
import { Role } from 'src/app/interfaces/role.enum';
import { UsuarioService } from 'src/app/services/usuario.service';
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

  paramsToAPI: {
    fechaCorte: string;
    asesorId: string | null;
    agenciasId: string | null;
  } = {
    fechaCorte: this.utils.obtenerFechaActual(),
    asesorId: '0',
    agenciasId: '0',
  };

  nombreAsesorSeleccionado="NINGUNO/A"
  nombreAgenciaSeleccionada="NINGUNA"

  listadoAgencias :IAgencia[]=[]
  listadoAsesores :IUsuario[]=[]

  reportState$: AppStateEntity<CuotasVencidas[]> = {};
  isFirstCallAjax: boolean = true; //Para que no afecte al iniciar el Datatable en el ngOnInit, hasta encontrar una forma de incializar el Datatable fuera del ngOnInit
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
    private agenciaService: AgenciasService,
    private usuarioSerice: UsuarioService,
    private reportSrv: ReportService,
    private alertSrv: AlertService,
    private excelSrv: ExcelServiceService,
    private utils: HelpersService
  ) {}

  ngOnInit(): void {
    this.agencias$ = this.obtenerAgencias$();
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
          .getCuotasVencidas$({...this.paramsToAPI})
          .pipe(
            tap((response) => {
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
            }),
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
            data =
              '<a target="_blank" href="https://maps.google.com/?q=' +
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

    dataForExcel.push([
      '',
      '',
      '',
      '',
      'Total',
      saldoTotal,
      saldoVencido,
      '',
      provision,
      '',
    ]);
    console.log({ EXCEL: dataForExcel });

    let reportData: excelDataCuotasVencidas = {
      header: {
        title: 'CUOTAS VENCIDAS',
        agencia: this.nombreAgenciaSeleccionada,
        date: this.utils.obtenerFechaActual(),
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
    dt?.ajax.reload();
  }

  obtenerAgencias$(): Observable<AppStateEntity<IAgencia[]>> {
    return this.agenciaService.getAgenciesByUserLogged$().pipe(
      map((response) => {
        if (response.data && response.data.length > 1) {
          let consolidado = response.data.map((ag) => ag.id);
          response.data.push({
            nombre: 'TODOS',
            id: consolidado.toString(),
          });
        }
        this.listadoAgencias = response.data!;
        return { state: DataState.LOADED, data: response.data };
      }),
      startWith({ state: DataState.LOADING }),
      catchError((error) => {
        //
        return of({ state: DataState.ERROR, error });
      })
    );
  }

  async onSubmit() {
    this.isFirstCallAjax = false;
    await this.reload();
  }

  obtenerUsuariosPorAgencia(event: any): void {
    let agencia = event.target.value;
    this.nombreAgenciaSeleccionada = this.listadoAgencias.find(val=> val.id  == agencia)?.nombre!
    // this.nombreAgenciaSeleccionada = this.agencias$
    this.paramsToAPI.asesorId = '0';
    this.nombreAsesorSeleccionado ="NINGUNO/A"
    // Aqui van los roles de los usuarios que quiero que aparezcan en el combobox
    const rolesId = `${(Role.ASESOR_CAPTACIONES, Role.GESTOR_CREDITO)}`;
    this.usuarios$ = this.usuarioSerice
      .getUsersByAgencies$({
        agencia,
        rolesId,
      })
      .pipe(
        map((response) => {
          response.data?.push({
            nombre: 'TODOS',
            usuario: 'ALL-USERS',
          });
          this.listadoAsesores = response.data!
          return { state: DataState.LOADED, data: response.data };
        })
      );
  }


  asesorSeleccionado(event: any){
    let usuarioId = event.target.value;
    this.nombreAsesorSeleccionado = this.listadoAsesores.find(val=> val.usuario  == usuarioId)?.nombre!
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  get isReadyAllParameters() {
    return (
      this.paramsToAPI.asesorId != '0' && this.paramsToAPI.agenciasId != '0'
    );
  }
}
