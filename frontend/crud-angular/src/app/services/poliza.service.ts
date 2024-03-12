import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class PolizaService {
  constructor(private httpClient: HttpClient) {}
  //URL_POLIZAS
  api_url: string = 'http://localhost:5050/ptmssqlsbng/polizas/';

  //obtener catálogo completo de polizas
  consultaPolizas(): Observable<any> {
    const respuesta = this.httpClient
      .get(this.api_url + 'consultapolizas')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          Swal.fire({
            title: 'Error',
            text: 'No se ha podido obtener el listado de polizas',
            icon: 'error',
            customClass: {
              confirmButton: 'swal-button--confirm custom-color',
            },
          });
          return throwError(error);
        })
      );
    return respuesta;
  }
  //añadir poliza
  anadirPoliza(poliza: any): Observable<any> {
    const respuesta = this.httpClient
      .post<any>(this.api_url + 'anadirpoliza', poliza)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo conectar con la base de datos para añadir la poliza',
            icon: 'error',
            customClass: {
              confirmButton: 'swal-button--confirm custom-color',
            },
          });
          return throwError(error);
        })
      );
    return respuesta;
  }
  //actualizar poliza
  actualizarPoliza(poliza: any): Observable<any> {
    const respuesta = this.httpClient
      .put<any>(this.api_url + 'actualizarpoliza', poliza)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo conectar con la base de datos para actualizar la poliza',
            icon: 'error',
            customClass: {
              confirmButton: 'swal-button--confirm custom-color',
            },
          });
          return throwError(error);
        })
      );
    return respuesta;
  }
  //consultar poliza por id
  consultaPoliza(idpoliza: number): Observable<any> {

    const respuesta = this.httpClient
      .get(this.api_url + 'consultapolizas/' + idpoliza)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          Swal.fire({
            title: 'Error',
            text: 'No se ha podido obtener la poliza con el id' + idpoliza,
            icon: 'error',
            customClass: {
              confirmButton: 'swal-button--confirm custom-color',
            },
          });
          return throwError(error);
        })
      );
    return respuesta;
  }
  //eliminar poliza por id
  eliminarPoliza(idpoliza: number): Observable<any> {
    const respuesta = this.httpClient
      .delete(this.api_url + 'eliminarpoliza/' + idpoliza)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo conectar con la base de datos',
            icon: 'error',
            customClass: {
              confirmButton: 'swal-button--confirm custom-color',
            },
          });
          return throwError(error);
        })
      );
    return respuesta;
  }
}
