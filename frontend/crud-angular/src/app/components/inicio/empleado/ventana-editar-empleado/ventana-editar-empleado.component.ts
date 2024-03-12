import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../../../../services/empleado.service';
import { Empleado } from '../../../../models/empleado.model';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ventana-editar-empleado',
  templateUrl: './ventana-editar-empleado.component.html',
  styleUrl: './ventana-editar-empleado.component.css',
})
export class VentanaEditarEmpleadoComponent {
  esUpdate: boolean = true;
  permiteConsulta: boolean = false;

  form: FormGroup;
  recibeEmpleado: boolean = true;
  empleado: Empleado;

  constructor(
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService,
    private dialogRef: MatDialogRef<VentanaEditarEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.recibeEmpleado) {
      this.empleado = this.data.empleado;
    }

    this.form = this.formBuilder.group({
      idempleado: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      puesto: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    });
  }

  enviar() {
    if (this.esUpdate) {
      let formValue = this.form.value;
      this.empleado = new Empleado(
        formValue.idempleado,
        formValue.nombre.toUpperCase(),
        formValue.apellido.toUpperCase(),
        formValue.puesto.toUpperCase()
      );
      this.empleadoService
        .actualizarEmpleado(this.empleado)
        .subscribe((respuesta) => {
          if (respuesta.meta.Status === 'OK') {
            Swal.fire({
              title: respuesta.data.Mensaje.Mensaje,
              icon: 'success',
              customClass: {
                confirmButton: 'swal-button--confirm custom-color',
              },
            });
            this.dialogRef.close();

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
  }
  eliminarEmpleado() {
    let idempleado: number = this.form.value.idempleado;
    this.empleadoService.eliminarEmpleado(idempleado).subscribe((respuesta) => {
      if (respuesta.meta.Status === 'OK') {
        Swal.fire({
          title: respuesta.data.Mensaje.Mensaje,
          icon: 'success',
          customClass: {
            confirmButton: 'swal-button--confirm custom-color',
          },
        });
        this.dialogRef.close();
        this.form.reset();
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

  alerta(respuesta: any) {}
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
}
