import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  //URL INVENTARIO
  api_url: string = 'http://localhost:5050/ptmssqlsbng/inventario/';

  constructor(private httpClient: HttpClient) {}
  //consultar inventario
  consultaInventario(): Observable<any> {
    const respuesta = this.httpClient
      .get(this.api_url + 'consultainventario')
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
  //añadir al inventario
  anadirInventario(inventario: any): Observable<any> {
    const respuesta = this.httpClient
      .post<any>(this.api_url + 'anadirinventario', inventario)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo conectar con la base de datos para añadir al inventario',
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
  //actualizar inventario
  actualizarInventario(inventario: any): Observable<any>{
    const respuesta = this.httpClient
      .put<any>(this.api_url + 'actualizarinventario', inventario)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo conectar con la base de datos para actualizar al inventario',
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
  //consultar inventario por id
  consultaInventarioxid(sku: string): Observable<any> {
    const respuesta = this.httpClient
      .get(this.api_url + 'consultainventario/' + sku)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          Swal.fire({
            title: 'Error',
            text: 'No se ha podido obtener el articulo con sku ' + sku,
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
  eliminarInventario(sku: string): Observable<any>{
    const respuesta = this.httpClient
      .delete(this.api_url + 'eliminarinventario/' + sku)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo conectar con la base de datos para eliminar el articulo con sku '+sku,
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
