import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { StorageService } from './storage.service';
import { ACCESS_TOKEN_KEY } from 'src/base/config/constantes';
import { CuotasVencidas } from '../interfaces/cuotasVencidas.interface';
import { GenericCRUDService } from 'src/2.data/helpers/generic-crud.service';
import { Observable } from 'rxjs';
import { ResponseEntity } from 'src/2.data/entities/response.entity';

@Injectable({
  providedIn: 'root',
})
export class CreditosService {
  private readonly base_url = `${environment.url_services}/Credit`;
  private readonly headers = {
    headers: new HttpHeaders().set('Content-type', 'application/json'),
    withCredentials: true,
  };

  constructor(
    private _localStorage: StorageService,
    private genericCRUDService: GenericCRUDService
  ) { }

  // getCuotasVencidasByAsesor$ = (fechaCorte: string,agenciaId: string,asesorId: string) => {
  //   const token = this._localStorage.getData(ACCESS_TOKEN_KEY);
  //   const headers = {
  //     headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
  //     withCredentials: true,
  //   };
  //   return this._genericCRUDService.postApiData(
  //     // `${this.base_url}?fechaCorte=${fechaCorte}&agenciaId=${agenciaId}&asesorId=${asesorId}`,
  //     `http://localhost:3000/api`,
  //     null,
  //     this.headers
  //   );
  // };
  getCuotasVencidasByAsesor$ = (params: { fecha: string, asesorId: string }):Observable<ResponseEntity< CuotasVencidas[]>> => {
    return this.genericCRUDService.getApiData<CuotasVencidas[]>(`${this.base_url}/cuotasVencidas?fechaCorte=${params.fecha}&asesorId=${params.asesorId}`)
  }
}
