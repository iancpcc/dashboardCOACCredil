import { Chart, registerables } from 'chart.js';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, catchError, map, of, startWith, tap } from 'rxjs';

import { DataState } from 'src/2.data/entities/app-state.entity';
import { HelpersService } from 'src/app/utils/helpers.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit,OnDestroy {
  constructor(
    private reportSrv: ReportService,
    private utilsSrv: HelpersService
  ) {
    Chart.register(...registerables);
  }
  ngOnDestroy(): void {
    this.myObservable$.unsubscribe();
    console.log("Observable destruido.")
  }

  etiquetas: string[] = [];
  datos: number[] = [];
  fecha: string = this.utilsSrv.obtenerFechaActual();
  readonly DataState = DataState;
  myObservable$ = new  Subscription;
  ngOnInit(): void {}

  @ViewChild('myChart', { static: true })
  myChartCanvas!: ElementRef<HTMLCanvasElement>;
  chart: any;
  ngAfterViewInit() {
    this.createPieChart();
    this.obtenerDatos();
    this.buildBarChart();
  }

  buildBarChart() {
    this.chart = new Chart('myChart', {
      type: 'bar', //this denotes tha type of chart
      data: {
        // values on X-Axis
        labels: this.etiquetas,
        datasets: [
          {
            label: 'Creciminento Cartera',
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
      },
    });
  }

  obtenerDatos() {
   this.myObservable$ = this.reportSrv
      .getDPFAperturadosPorAgencia$(this.fecha)
      .pipe(
        map((response) => {
          return { state: DataState.LOADED, data: response.data };
        }),
        startWith({ state: DataState.LOADING, data: [] }),
        catchError((error) => of({ state: DataState.ERROR, error, data: [] }))
      )
      .subscribe((response) => {

        if (response.state === DataState.LOADED) {
          console.log("datos", response.data)
          this.etiquetas = response.data?.map((res: any) => res.agencia)!;
          this.datos = response.data?.map((res: any) => res.monto)!;
          this.chart.data.labels = this.etiquetas;
          this.chart.data.datasets.forEach((dt: any) => {
            dt.data = this.datos;
          });
          this.chart.update();
        }
        else if(response.state == DataState.ERROR){
          console.log("Ocurrio un error")
        }
      });
  }

  reloadBarChart() {
    this.obtenerDatos();
  }

  createPieChart() {
    new Chart('myChart2', {
      type: 'pie', //this denotes tha type of chart
      data: {
        labels: ['Activos', 'Inactivos', 'Otros'],
        yLabels: ['Hola'],
        datasets: [
          {
            label: 'Socios',

            data: [300, 50, 100],
            backgroundColor: [
              'rgb(54, 162, 235)',
              'rgb(255, 99, 132)',
              'rgb(255, 205, 86)',
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

            // position:"center",
          },
        },
      },
    });
  }
}
