import { Component, Input } from '@angular/core';
import { Inventario } from '../../../../models/inventario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventarioService } from '../../../../services/inventario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-inventario',
  templateUrl: './formulario-inventario.component.html',
  styleUrl: './formulario-inventario.component.css',
})
export class FormularioInventarioComponent {
  @Input() recibeInventario: boolean = false;
  @Input() esUpdate: boolean = false;
  @Input() permiteConsulta: boolean = false;
  @Input() inventarioRecibido: Inventario;
  inventario: Inventario = new Inventario('', '', 0);
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private inventarioService: InventarioService
  ) {
    this.form = this.formBuilder.group({
      sku: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
      nombre: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  enviar() {
    if (!this.esUpdate) {
      let formValue = this.form.value;
      this.inventario = new Inventario(
        formValue.sku.toUpperCase(),
        formValue.nombre.toUpperCase(),
        formValue.cantidad
      );
      this.inventarioService
        .anadirInventario(this.inventario)
        .subscribe((respuesta) => {
          this.alerta(respuesta);
        });
    } else {
      let formValue = this.form.value;
      this.inventario = new Inventario(
        formValue.sku.toUpperCase(),
        formValue.nombre.toUpperCase(),
        formValue.cantidad
      );
      this.inventarioService
        .actualizarInventario(this.inventario)
        .subscribe((respuesta) => {
          this.alerta(respuesta);
        });
    }
  }
  consultaInventario() {
    let sku: string = this.form.value.sku;
    this.inventarioService.consultaInventarioxid(sku).subscribe((respuesta) => {
      if (respuesta.data.Inventario[0]) {
        this.inventario = respuesta.data.Inventario[0];
      } else {
        if (!respuesta.data.Inventario[0]) {
          Swal.fire({
            title: 'No se encontró el articulo con el SKU '+ sku,
            icon: 'error',
            customClass: {
              confirmButton: 'swal-button--confirm custom-color',
            },
          });
        }
      }
    });
  }
  eliminarInventario() {
    let sku: string = this.form.value.sku;
    this.inventarioService.eliminarInventario(sku).subscribe((respuesta) => {
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
