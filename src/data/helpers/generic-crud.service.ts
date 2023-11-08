import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
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

  // private handleError(error: HttpErrorResponse) {
  //   let errorMessage: CustomError = {};
  //   // ;
  //   if (error.error instanceof ErrorEvent) {
  //     // Error de red
  //     errorMessage = {
  //       message: error.message,
  //       messageDeveloper: `Error: ${error.statusText}`,
  //       code: error.status,
  //     };
  //   }
  //   if (error.status && !error.error) {//No hay coneccion al back

  //     errorMessage = {
  //       message: 'No se ha podido establecer conexión con el servidor',
  //       messageDeveloper: `Error Code: ${error.status}\nMessage: ${error.message}`,
  //       code: error.status,
  //     }

  //   } else { //Respuesta desde el backend
  //     errorMessage = {
  //       message: error.error.Message,
  //       messageDeveloper: `Error Code: ${error.status}\nMessage: ${error.message}`,
  //       code: error.status,
  //     };
  //   }

  private handleError(error: HttpErrorResponse) {
    //
    let errorMessage: CustomError = { message:"Un error ha ocurrido: ",  code: error.status};
    //

    if (error.error instanceof ErrorEvent) {
      errorMessage.message =`${error.error.message}`;
    } else {
      errorMessage.message = `${error.status} - ${error?.error?.Message?? error.name} `;

      if (error.status ==0 ){
        errorMessage.message = `${error.status} - ${error.name} | No se pudo conectar con el servidor `;
      }

      errorMessage.messageDeveloper = error.error;
    }
    //
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}

// let messageErrorHandler: CustomError;

// const { error, status, message } = err;
// if (error instanceof ErrorEvent) {
//   messageErrorHandler = {
//     code: status,
//     message: message,
//     messageDeveloper: error.message,
//   };
// }

// if (status === 0) {
//   messageErrorHandler = {
//     code: status,
//     messageDeveloper: message,
//     message: 'No se pudo conectar con el servidor',
//   };
// } else {
//   messageErrorHandler = {
//     code: status,
//     messageDeveloper: error.message,
//     message: error.error,
//   };
// }
