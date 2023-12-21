import { Observable, of } from 'rxjs';

import { CuotasVencidas } from '../interfaces/IReportes/cuotas-vencidas.interface';
import { GenericCRUDService } from 'src/data/helpers/generic-crud.service';
import { HttpClient } from '@angular/common/http';
import { ICumpleaniosSocios } from '../interfaces/IReportes/cumpleanios-socios.interface';
import { IDPFAperturados } from '../interfaces/IReportes/dpf-aperturados.interface';
import { ISituacioCrediticia } from '../interfaces/IReportes/situacion-crediticia.interface';
import { ISociosMora } from '../interfaces/IReportes/socios-mora.interface';
import { ITotalUsuariosPanel } from '../interfaces/IReportes/total-usuarios.interface';
import { Injectable } from '@angular/core';
import { NINGUN_ITEM_SELECCIONADO_CONFIG } from 'src/base/config/rutas-app';
import { RPlazoFijo } from '../interfaces/IReportes/plazo-fijo.interface';
import { ResponseEntity } from 'src/data/entities/response.entity';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly base_url = `${environment.url_services}/Report`;

  public NINGUN_ITEM_SELECCIONADO_ID = NINGUN_ITEM_SELECCIONADO_CONFIG;

  constructor(
    private genericCRUDService: GenericCRUDService,
    private httpClient: HttpClient
  ) {}

  getCuotasVencidas$ = (params: {
    fechaCorte: string;
    asesorId: string | null;
    agenciasId: string | null;
  }): Observable<ResponseEntity<CuotasVencidas[]>> => {
    if (
      params.asesorId == this.NINGUN_ITEM_SELECCIONADO_ID &&
      params.agenciasId == this.NINGUN_ITEM_SELECCIONADO_ID
    ) {
      return of({ data: [] });
    }
    //Al enviar un NULL al endpoint de la API me retona todos los usuarios de esa [Agencia]
    params.asesorId = params.asesorId === 'ALL-USERS' ? null : params.asesorId;

    return this.genericCRUDService.postApiData<CuotasVencidas[]>({
      url: `${this.base_url}/cuotas_vencidas?`,
      body: params,
    });
  };

  getSociosMora$ = (params: {
    fechaCorte: string | null;
    diasMora: number | null;
  }): Observable<ResponseEntity<ISociosMora[]>> => {
    const {fechaCorte, diasMora} = params;
    if (fechaCorte == null || diasMora == 0)
      return of({ data: [] });

    //Al enviar un NULL al endpoint de la API me retona todos los usuarios de esa [Agencia]
    // params.asesorId = params.asesorId === 'ALL-USERS' ? null : params.asesorId;

    return this.genericCRUDService.getApiData<ISociosMora[]>(`${this.base_url}/socios_mora_para_envio_de_sms?fechaCorte=${fechaCorte}&diasMora=${diasMora}`)};


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
      { uid: '7Uuw06pBYVMqwk9RYspKiRcodg42' }
    );
  };

  getCumpleaniosSocios$ = (params: {
    idAgencia: string | null;
    dias: number;
  }): Observable<ResponseEntity<ICumpleaniosSocios[]>> => {

    if (params.idAgencia == this.NINGUN_ITEM_SELECCIONADO_ID) {
      return of({ data: [] });
    }

    return this.genericCRUDService.getApiData<ICumpleaniosSocios[]>(
      `${this.base_url}/cumpleanios_por_dias?idAgencia=${params.idAgencia}&dias=${params.dias}`
    );
  };

  getSituacionCrediticia$ = (params: {
    codigoAgencias: string;
    fechaCorte: string;
  }): Observable<ResponseEntity<ISituacioCrediticia[]>> => {
    if (params.codigoAgencias == this.NINGUN_ITEM_SELECCIONADO_ID) {
      return of({ data: [] });
    }

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

    if (params.codigoAsesores === this.NINGUN_ITEM_SELECCIONADO_ID) {
      return of({ data: [] });
    }
    params.codigoAsesores = params.codigoAsesores === 'ALL-USERS' ? null : params.codigoAsesores;

    return this.genericCRUDService.postApiData<RPlazoFijo[]>({
      url: `${this.base_url}/proximos_vencimientos`,
      body: params,
    });
  };
}
