import { Component, Input } from '@angular/core';

import { DataState } from 'src/data/entities/app-state.entity';

@Component({
  selector: 'app-boton-generar-reporte',
  templateUrl: './boton-generar-reporte.component.html',
  styleUrls: ['./boton-generar-reporte.component.css']
})
export class BotonGenerarReporteComponent {

  @Input() estadoReporte!:DataState ;
  @Input() seValidaronCampos:boolean = false;

  DataState = DataState;


}
