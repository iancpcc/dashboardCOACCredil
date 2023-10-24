import { Chart, registerables } from 'chart.js';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Observable,
  Subscription,
  catchError,
  map,
  of,
  shareReplay,
  startWith,
  tap,
} from 'rxjs';

import { AlertService } from 'src/app/utils/alert.service';
import { DataState } from 'src/2.data/entities/app-state.entity';
import { HelpersService } from 'src/app/utils/helpers.service';
import { ITotalUsuariosPanel } from 'src/app/interfaces/IReportes/total-usuarios.interface';
import { ReportService } from 'src/app/services/report.service';
import { ResponseEntity } from 'src/2.data/entities/response.entity';
import { error } from 'jquery';

@Component({
  selector: 'app-home-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  barChart: any;
  donnougtChart: any;

  constructor(
    private reportSrv: ReportService,
    private utilsSrv: HelpersService,
    private alertSrv: AlertService
  ) {
    Chart.register(...registerables);
  }

  etiquetas: string[] = [];
  datos: number[] = [];
  fecha: string = this.utilsSrv.obtenerFechaActual();
  readonly DataState = DataState;
  apiResponseUsuarios$!: Observable<ResponseEntity<ITotalUsuariosPanel>>;
  apiSuscription$!: Subscription;
  apiSociosBanca$!: Subscription;
  paramsToApi = { monthIndex: 0, year: 0 };
  totalSociosBanca = { total: 0, activos: 1945, inactivos: 82,};
  monthsOfYear = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  ngOnInit(): void {
    this.cargarParametrosIniciales();
    this.obtenerDatosParaBarChart();
    this.buildBarChart();
    this.createPieChart();
    this.obtenerDatosParaCards();
    this.obtenerSociosBanca();
  }
  ngOnDestroy(): void {
    this.apiSuscription$?.unsubscribe();
    this.apiSociosBanca$?.unsubscribe();
  }

  cargarParametrosIniciales() {
    let currentDate = new Date();
    this.paramsToApi.monthIndex = currentDate.getMonth() + 1;
    this.paramsToApi.year = currentDate.getFullYear();
  }

  obtenerSociosBanca(): void {
    this.apiSociosBanca$ = this.reportSrv
      .getSociosBanca$()
      .pipe(
        map((resp) => {
          const { listUsers, size } = resp;

          return { state: DataState.LOADED, data:  { listUsers, size } };
        }),
        startWith({ state: DataState.LOADING ,data:{ listUsers:0, size:0 }}),
        catchError((error) => {
          return of({ state: DataState.ERROR, error, data:{ listUsers:0, size:0 } });
        })
        )
        .subscribe(
          (res)=>{
            if (res.state ==DataState.LOADED  ){
              this.totalSociosBanca = {
                total: res.data?.size,
                activos: res.data?.listUsers.filter((r: any) => r.status == true).length,
                inactivos: res.data?.listUsers.filter((r: any) => r.status == false).length,
              };
              this.donnougtChart.data.datasets.forEach((dt: any) => {
                dt.data = [this.totalSociosBanca.activos, this.totalSociosBanca.inactivos];
              });
              this.donnougtChart.update()
            }

        }

      );
  }

  buildBarChart() {
    this.barChart = new Chart('myChart', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.etiquetas,

        datasets: [
          {
            label: 'DPFs Aperturados',
            data: this.datos,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2.75,
      },
    });
  }

  obtenerDatosParaBarChart() {
    this.apiSuscription$ = this.reportSrv
      .getDPFAperturadosPorAgencia$(this.paramsToApi)
      .pipe(
        map((response) => {
          return { state: DataState.LOADED, data: response.data };
        }),
        startWith({ state: DataState.LOADING, data: [] }),
        catchError((error) => {
          // this.alertSrv.showAlertError(error.message)
          return of({ state: DataState.ERROR, error, data: [] });
        }),
        shareReplay(1)
      )
      .subscribe((response) => {
        if (response.state === DataState.LOADED) {
          this.etiquetas = response.data?.map((res: any) => res.agencia)!;
          this.datos = response.data?.map((res: any) => res.monto)!;
          this.barChart.data.labels = this.etiquetas;
          this.barChart.data.datasets.forEach((dt: any) => {
            dt.data = this.datos;
          });
          this.barChart.update();
        }
      });
  }
  obtenerDatosParaCards() {
    this.apiResponseUsuarios$ = this.reportSrv.getTotalClientesSocios$().pipe(
      map((response) => {
        return { state: DataState.LOADED, data: response.data };
      }),
      startWith({ state: DataState.LOADING, data: {} }),
      catchError((error) => of({ state: DataState.ERROR, error }))
    );
  }

  reloadBarChart(monthIndex: number = 1) {
    this.paramsToApi.monthIndex = monthIndex;
    this.obtenerDatosParaBarChart();
  }

  createPieChart() {
    this.donnougtChart = new Chart('myChart2', {
      type: 'doughnut', //this denotes tha type of chart
      data: {
        labels: ['Activos', 'Inactivos'],
        datasets: [
          {
            label: 'Socios',

            data: [this.totalSociosBanca.activos, this.totalSociosBanca.inactivos],
            backgroundColor: [
              'rgb(1, 163, 164)',
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: {},

            // position:"center",
          },
          title: {
            display: true,
            text: 'Usuarios que utilizan banca',
          },
        },
      },
    });
  }
}
