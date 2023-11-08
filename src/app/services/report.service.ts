import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CuotasVencidas } from '../interfaces/IReportes/cuotas-vencidas.interface';
import { GenericCRUDService } from 'src/data/helpers/generic-crud.service';
import { ICumpleaniosSocios } from '../interfaces/IReportes/cumpleanios-socios.interface';
import { IDPFAperturados } from '../interfaces/IReportes/dpf-aperturados.interface';
import { ISituacioCrediticia } from '../interfaces/IReportes/situacion-crediticia.interface';
import { ITotalUsuariosPanel } from '../interfaces/IReportes/total-usuarios.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RPlazoFijo } from '../interfaces/IReportes/plazo-fijo.interface';
import { ResponseEntity } from 'src/data/entities/response.entity';
import { environment } from 'src/environments/environment.development';
import { map } from 'jquery';

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
    private genericCRUDService: GenericCRUDService,
    private httpClient: HttpClient
  ) {}

  getCuotasVencidas$ = (params: {
    fechaCorte: string;
    asesorId: string | null;
    agenciasId: string | null;
  }): Observable<ResponseEntity<CuotasVencidas[]>> => {
    //
    if (params.asesorId === 'ALL-USERS') {
      params.asesorId = null;
    }
    return this.genericCRUDService.postApiData<CuotasVencidas[]>({
      url: `${this.base_url}/cuotas_vencidas?`,
      body: params,
    });
  };

  getDPFAperturadosPorAgencia$ = (params: {
    monthIndex: number;
    year: number;
  }): Observable<ResponseEntity<IDPFAperturados[]>> => {
    return this.genericCRUDService.getApiData<IDPFAperturados[]>(
      `${this.base_url}/dpf_aperturados_por_agencia?mes=${params.monthIndex}&anio=${params.year}`
    );
  };

  getTotalClientesSocios$ = (): Observable<
    ResponseEntity<ITotalUsuariosPanel>
  > => {
    return this.genericCRUDService.getApiData<ITotalUsuariosPanel>(
      `${this.base_url}/total_usuarios?`
    );
  };

  // Este endpoint es de BLACKLEVEL para obtener el numero de socios en la banca
  getSociosBanca$ = (): Observable<any> => {
    return this.httpClient.post<any>(
      'https://us-central1-credilenlinea.cloudfunctions.net/coopOnLine/app/getUsersExternal',
       {uid: '7Uuw06pBYVMqwk9RYspKiRcodg42'}
    );
  };

  getCumpleaniosSocios$ = (params: {
    idAgencia: number;
    dias: number;
  }): Observable<ResponseEntity<ICumpleaniosSocios[]>> => {
    return this.genericCRUDService.getApiData<ICumpleaniosSocios[]>(
      `${this.base_url}/cumpleanios_por_dias?idAgencia=${params.idAgencia}&dias=${params.dias}`
    );
  };


  getSituacionCrediticia$ = (params: {
    codigoAgencias: string;
    fechaCorte: string;
  }): Observable<ResponseEntity<ISituacioCrediticia[]>> => {
    return this.genericCRUDService.postApiData<ISituacioCrediticia[]>({
      url: `${this.base_url}/situacion_crediticia`,
      body: params,
    });
  };

  obtenerPlazoFijoPorAsesor$ = (params: {
    codigoAgencias: string;
    codigoAsesores: string | null;
    diaFin: number;
    diaInicio: number;
  }): Observable<ResponseEntity<RPlazoFijo[]>> => {
    params.codigoAgencias = params.codigoAgencias.toString();
    //
    if (params.codigoAsesores === 'null') {
      params.codigoAsesores = null;
    }
    return this.genericCRUDService.postApiData<RPlazoFijo[]>({
      url: `${this.base_url}/proximos_vencimientos`,
      body: params,
    });
  };
}
