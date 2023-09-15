import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import {  Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InvalidService {

//   constructor(private httpClient: HttpClient) {}

//   getApiData<T>(apiUrl: string): Observable<any> {
//     return this.httpClient
//       .get<T>(apiUrl)
//       .pipe(catchError((err) => this.handleError(err)));
//   }
//   postApiData<T>(
//     apiUrl: string,
//     data?: string | object | null,
//     headers?: object
//   ): Observable<any> {
//     return this.httpClient
//       .post<T>(apiUrl, data, headers)
//       .pipe(catchError((err) => this.handleError(err)));
//   }

//   handleError(err: HttpErrorResponse) {
//     debugger;
    
//     let message: any;
//     if (err.error instanceof ErrorEvent) {
//       message = { code: err.status, message: err.message };
//     } else {
//       if (err.status === 0) {
//         message = {
//           code: err.status,
//           messageDeveloper: err.message,
//           message: 'No se pudo conectar con el servidor',
//         };
//       } else {
//         message = {
//           code: err.status,
//           messageDeveloper: err.error.message,
//           message: err.error.error,
//         };
//       }
//     }

//     return throwError(() => message);
//   }
}
