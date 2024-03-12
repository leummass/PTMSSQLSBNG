import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Empleado } from '../models/empleado.model';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  constructor(private httpClient: HttpClient) {}

  //URL EMPLEADOS
  api_url: string = 'http://localhost:5050/ptmssqlsbng/empleado/';

  //obtener catálogo completo de empleados

  consultaEmpleados(): Observable<any> {
    const respuesta = this.httpClient
      .get(this.api_url + 'consultaempleados')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          Swal.fire({
            title: 'Error',
            text: 'No se ha podido obtener el listado de empleados',
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
  //añadir empleado
  anadirEmpleado(Empleado: any): Observable<any> {
    const respuesta = this.httpClient
      .post<any>(this.api_url + 'anadirempleado', Empleado)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo conectar con la base de datos para añadir al empleado',
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
  //actualizar empleado
  actualizarEmpleado(Empleado: any): Observable<any> {
    const respuesta = this.httpClient
      .put<any>(this.api_url + 'actualizarempleado', Empleado)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo conectar con la base de datos para actualizar al empleado',
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
  //consultar empleado por id
  consultaEmpleado(idempleado: number): Observable<any> {
    const respuesta = this.httpClient
      .get(this.api_url + 'consultaempleado/' + idempleado)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          Swal.fire({
            title: 'Error',
            text: 'No se ha podido obtener el empleado con id ' + idempleado,
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
  //eliminar empleado por id
  eliminarEmpleado(idempleado: number): Observable<any> {
    const respuesta = this.httpClient
      .delete(this.api_url + 'eliminarempleado/' + idempleado)
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
