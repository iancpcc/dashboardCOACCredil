import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { ResponseEntity } from 'src/2.data/entities/response.entity';
import { ACCESS_TOKEN_KEY } from 'src/base/config/constantes';

@Injectable({
  providedIn: 'root',
})
export class RiesgosService {
  private readonly base_url = `${environment.url_services}/Riesgos/copyInformation`;
  private readonly headers = {
    headers: new HttpHeaders().set('Content-type', 'application/json'),
    withCredentials: true,
  };

  constructor(
    private _localStorage: StorageService
  ) {}

  runSP$ = (
    nameSP: String | number = '',
    date: string
  ): Observable<any> => {
    const token = this._localStorage.getData(ACCESS_TOKEN_KEY);
    const headers = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      withCredentials: true,
    };

    return of(true)
    // return this._genericCRUDService.postApiData<ResponseEntity<any>>(
    //   `${this.base_url}?date=${date}&nameSp=${nameSP}`,
    //   null,
    //   headers
    // );
  };
}
