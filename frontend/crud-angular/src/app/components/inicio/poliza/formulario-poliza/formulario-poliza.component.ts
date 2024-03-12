import { Component, Input } from '@angular/core';
import { Poliza } from '../../../../models/poliza.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PolizaService } from '../../../../services/poliza.service';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-formulario-poliza',
  templateUrl: './formulario-poliza.component.html',
  styleUrl: './formulario-poliza.component.css',
  providers: [provideNativeDateAdapter()]
})
export class FormularioPolizaComponent {
  @Input() recibePoliza: boolean = false;
  @Input() esUpdate: boolean = false;
  @Input() permiteConsulta: boolean = false;
  @Input() polizaRecibida: Poliza;
  poliza: Poliza = new Poliza(0, 0, '', 0, '');

  form: FormGroup;
  constructor(
    private polizaService: PolizaService,
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
  ) {
    if (this.recibePoliza) {
      this.poliza = this.polizaRecibida;
    }
    this.form = this.formBuilder.group({
      idpolizas: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      empleadogenero: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      sku: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
      cantidad: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      fecha: ['',[Validators.required]],
    });
  }
  enviar() {
    if (!this.esUpdate) {
      let formValue = this.form.value;
      console.log(formValue);
      this.poliza = new Poliza(
        formValue.idpolizas,
        formValue.empleadogenero,
        formValue.sku.toUpperCase(),
        formValue.cantidad,
        formValue.fecha
      );
      this.polizaService.anadirPoliza(this.poliza).subscribe((respuesta) => {
        this.alerta(respuesta);
      });
    } else {
      let formValue = this.form.value;
      this.poliza = new Poliza(
        formValue.idpolizas,
        formValue.empleadogenero,
        formValue.sku.toUpperCase(),
        formValue.cantidad,
        formValue.fecha
      );
      this.polizaService
        .actualizarPoliza(this.poliza)
        .subscribe((respuesta) => {
          this.alerta(respuesta);
        });
    }
  }
  consultaPoliza() {
    let idpoliza: number = this.form.value.idpolizas;
    this.polizaService.consultaPoliza(idpoliza).subscribe((respuesta) => {
      console.log(respuesta);
      if (respuesta.data.Poliza[0]) {
        this.poliza = respuesta.data.Poliza[0];
      } else {
        Swal.fire({
          title: 'No se encontró poliza',
          text: 'No se encontró poliza con el id '+idpoliza,
          icon: 'error',
          customClass: {
            confirmButton: 'swal-button--confirm custom-color',
          },
        });
      }
    });
  }
  eliminarPoliza() {
    let idpoliza: number = this.form.value.idpolizas;
    this.polizaService.eliminarPoliza(idpoliza).subscribe((respuesta) => {
      if (respuesta.meta.Status === 'OK') {
        Swal.fire({
          title: respuesta.data.Mensaje.Mensaje,
          icon: 'success',
          customClass: {
            confirmButton: 'swal-button--confirm custom-color',
          },
        });
        this.resetForm();
      } else {
        Swal.fire({
          title: respuesta.data.Mensaje.Mensaje,
          icon: 'error',
          customClass: {
            confirmButton: 'swal-button--confirm custom-color',
          },
        });
      }
    });
  }
  alerta(respuesta: any) {
    if (respuesta.meta.Status === 'OK') {
      Swal.fire({
        title: respuesta.data.Mensaje.Mensaje,
        icon: 'success',
        customClass: {
          confirmButton: 'swal-button--confirm custom-color',
        },
      });

      this.resetForm();
    } else {
      Swal.fire({
        title: respuesta.data.Mensaje.Mensaje,
        icon: 'error',
        customClass: {
          confirmButton: 'swal-button--confirm custom-color',
        },
      });
    }
  }

  MensajeError(nombre_campo: string) {
    const campo = this.form.get(nombre_campo);
    if (campo?.hasError('required')) {
      return 'Campo requerido';
    }
    if (campo?.hasError('pattern')) {
      return 'Formato incorrecto';
    }

    return '';
  }
  resetForm() {
    this.form.reset();
  }
  
  formatDate(){
    return 'YYYY-MM-DD';
  }
}
