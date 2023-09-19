import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ACCESS_TOKEN_KEY } from 'src/base/config/constantes';
import { CuotasVencidas } from '../interfaces/cuotas-vencidas.interface';
import { GenericCRUDService } from 'src/2.data/helpers/generic-crud.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseEntity } from 'src/2.data/entities/response.entity';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment.development';
import { RPlazoFijo } from '../interfaces/plazo-fijo.interface';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly base_url = `${environment.url_services}/Report`;
  private readonly headers = {
    headers: new HttpHeaders().set('Content-type', 'application/json'),
    withCredentials: true,
  };

  constructor(
    private genericCRUDService: GenericCRUDService
  ) { }


  getCuotasVencidasByAsesor$ = (params: { fecha: string, asesorId: string }):Observable<ResponseEntity< CuotasVencidas[]>> => {
    return this.genericCRUDService.getApiData<CuotasVencidas[]>(`${this.base_url}/cuotas_vencidas?fechaCorte=${params.fecha}&asesorId=${params.asesorId}`)
  }

  obtenerPlazoFijoPorAsesor$ = (params: { codigoAgencias: string , codigoAsesores:string, diaFin: number, diaInicio:number }):Observable<ResponseEntity< RPlazoFijo[]>> => {
    return this.genericCRUDService.postApiData<RPlazoFijo[]>({ url:`${this.base_url}/proximos_vencimientos`, body: params})
  }
}
