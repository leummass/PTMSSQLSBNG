import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../../../../services/empleado.service';
import { Empleado } from '../../../../models/empleado.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-empleado',
  templateUrl: './formulario-empleado.component.html',
  styleUrl: './formulario-empleado.component.css',
})
export class FormularioEmpleadoComponent {
  @Input() recibeEmpleado: boolean = false;
  @Input() esUpdate: boolean = false;
  @Input() permiteConsulta: boolean = false;
  @Input() empleadoRecibido: Empleado;
  empleado: Empleado = new Empleado(0, '', '', '');

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService
  ) {
   
    if (this.recibeEmpleado) {
      this.empleado = this.empleadoRecibido;
    }

    this.form = this.formBuilder.group({
      idempleado: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      apellido: ['',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      puesto: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.resetForm();
    
  }

  enviar() {
    if (!this.esUpdate) {
      let formValue = this.form.value;
      this.empleado = new Empleado(
        formValue.idempleado,
        formValue.nombre.toUpperCase(),
        formValue.apellido.toUpperCase(),
        formValue.puesto.toUpperCase()
      );
      this.empleadoService
        .anadirEmpleado(this.empleado)
        .subscribe((respuesta) => {
          this.alerta(respuesta);
        });
    } else {
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
          this.alerta(respuesta);
        });
    }
  }
  consultaEmpleado() {
    let idempleado: number = this.form.value.idempleado;
    this.empleadoService.consultaEmpleado(idempleado).subscribe((respuesta) => {
      console.log(respuesta);
      if (respuesta.data.Empleado[0]) {
        this.empleado = respuesta.data.Empleado[0];
      } else {
        Swal.fire({
          title: "No se encontró ningun empleado con ID "+idempleado,
          icon: 'error',
          customClass: {
            confirmButton: 'swal-button--confirm custom-color',
          },
        });
      }
    });
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
}
