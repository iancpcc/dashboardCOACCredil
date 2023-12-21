import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  constructor() {}

  months = [
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

  obtenerFechaActual(): string {
    const currentDate = new Date();
    const dia = currentDate.getDate().toString().padStart(2, '0');
    const mes = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan en 0
    const anio = currentDate.getFullYear().toString();
    const fechaYYYYMMDD = `${anio}-${mes}-${dia}`;
    return fechaYYYYMMDD;
  }

  obtenerFechaInforme(ciudad = 'Ambato'): string {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = this.months[fechaActual.getMonth()];
    const año = fechaActual.getFullYear();

    const fechaEnFormato = `${ciudad}, ${dia} de ${mes.toLocaleLowerCase()} del ${año}`;

    return fechaEnFormato;
  }
}
