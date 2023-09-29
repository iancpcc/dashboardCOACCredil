import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ACCESS_TOKEN_KEY } from 'src/base/config/constantes';
import { CuotasVencidas } from '../interfaces/IReportes/cuotas-vencidas.interface';
import { GenericCRUDService } from 'src/2.data/helpers/generic-crud.service';
import { IDPFAperturados } from '../interfaces/IReportes/dpf-aperturados.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RPlazoFijo } from '../interfaces/IReportes/plazo-fijo.interface';
import { ResponseEntity } from 'src/2.data/entities/response.entity';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly base_url = `${environment.url_services}/Report`;
  private readonly headers = {
    headers: new HttpHeaders().set('Content-type', 'application/json'),
    withCredentials: true,
  };

  OBTENER_TODOS_KEY = 'ALL';

  constructor(private genericCRUDService: GenericCRUDService) {}

  getCuotasVencidasByAsesor$ = (params: {
    fecha: string;
    asesorId: string;
  }): Observable<ResponseEntity<CuotasVencidas[]>> => {
    return this.genericCRUDService.getApiData<CuotasVencidas[]>(
      `${this.base_url}/cuotas_vencidas?fechaCorte=${params.fecha}&asesorId=${params.asesorId}`
    );
  };

  getDPFAperturadosPorAgencia$ = (
    fechaCorte: string
  ): Observable<ResponseEntity<IDPFAperturados[]>> => {
    return this.genericCRUDService.getApiData<IDPFAperturados[]>(
      `${this.base_url}/dpf_aperturados_por_agencia?fechaCorte=${fechaCorte}`
    );
  };

  obtenerPlazoFijoPorAsesor$ = (params: {
    codigoAgencias: string;
    codigoAsesores: string | null;
    diaFin: number;
    diaInicio: number;
  }): Observable<ResponseEntity<RPlazoFijo[]>> => {
    params.codigoAgencias = params.codigoAgencias.toString();
    // debugger
    if (params.codigoAsesores === this.OBTENER_TODOS_KEY) {
      params.codigoAsesores = null;
    }
    return this.genericCRUDService.postApiData<RPlazoFijo[]>({
      url: `${this.base_url}/proximos_vencimientos`,
      body: params,
    });
  };
}
