import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { CustomError } from '../entities/app-state.entity';
import { Injectable } from '@angular/core';
import { ResponseEntity } from '../entities/response.entity';

@Injectable({
  providedIn: 'root',
})
export class GenericCRUDService {
  constructor(private httpClient: HttpClient) {}

  getApiData<T>(apiUrl: string): Observable<ResponseEntity<T>> {
    return this.httpClient.get<ResponseEntity<T>>(apiUrl).pipe(catchError((err) => this.handleError(err)));
  }



  postApiData<T>(params: {
    url: string;
    body?: {};
  }): Observable<ResponseEntity<T>> {
    return this.httpClient
      .post<ResponseEntity<T>>(params.url, params.body)
      .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    //
    let errorMessage: CustomError = { message:"Un error ha ocurrido: ",  code: error.status};
    //

    if (error.error instanceof ErrorEvent) { //Error de red
      errorMessage.message =`${error.error.message}`;
    } else { //Error API
      errorMessage.message = `${error.status} - ${error?.error?.Message?? error.name} `;

      if (error.status ==0 ){ // ERROR SERVER
        errorMessage.message = `${error.status} - ${error.name} | No se pudo conectar con el servidor `;
      }

      errorMessage.messageDeveloper = error.error;
    }
    //
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}


