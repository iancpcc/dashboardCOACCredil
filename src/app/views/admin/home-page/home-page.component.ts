import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartItem } from 'chart.js';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent  {

  @ViewChild('myChart', { static: true }) myChartCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {

  }


}
