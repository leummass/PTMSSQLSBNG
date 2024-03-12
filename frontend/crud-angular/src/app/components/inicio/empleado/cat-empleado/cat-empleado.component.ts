import { Component, ViewChild } from '@angular/core';
import { Empleado } from '../../../../models/empleado.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EmpleadoService } from '../../../../services/empleado.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { VentanaEditarEmpleadoComponent } from '../ventana-editar-empleado/ventana-editar-empleado.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cat-empleado',
  templateUrl: './cat-empleado.component.html',
  styleUrl: './cat-empleado.component.css',
})
export class CatEmpleadoComponent {
  displayedColumns: string[] = ['ID', 'Nombre', 'Apellido', 'Puesto'];
  dataSource = new MatTableDataSource<Empleado>();
  form: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private empleadoService: EmpleadoService,
    formBuilder: FormBuilder,
    public ventana: MatDialog
  ) {
    this.dataSource.filterPredicate = ((data, filter) => {
      const filters = JSON.parse(filter);
      const a =
        !filters[0].fIdEmpleado ||
        String(data.idempleado).toLowerCase().includes(filters[0].fIdEmpleado);
      const b =
        !filters[1].fNombre ||
        data.nombre.toLowerCase().includes(filters[1].fNombre);
      const c =
        !filters[2].fApellido ||
        data.apellido.toLowerCase().includes(filters[2].fApellido);
      const d =
        !filters[3].fPuesto ||
        data.puesto.toLowerCase().includes(filters[3].fPuesto);
      return a && b && c && d;
    }) as (Empleado: Empleado, string: string) => boolean;

    this.form = formBuilder.group({
      fIdEmpleado: '',
      fNombre: '',
      fApellido: '',
      fPuesto: '',
    });
    this.form.valueChanges.subscribe(
      (value: {
        fIdEmpleado: any;
        fNombre: any;
        fApellido: any;
        fPuesto: any;
      }) => {
        const filter = [
          { fIdEmpleado: value.fIdEmpleado },
          { fNombre: value.fNombre },
          { fApellido: value.fApellido },
          { fPuesto: value.fPuesto },
        ];
        this.dataSource.filter = JSON.stringify(filter);
      }
    );
  }

  ngOnInit() {
    this.obtenerEmpleados();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  obtenerEmpleados() {
    this.empleadoService.consultaEmpleados().subscribe((respuesta) => {
      if (respuesta) {
        this.dataSource.data = respuesta.data.Empleados;

        if (this.dataSource.data.length === 0) {
          Swal.fire({
            title: 'Error',
            text: 'No se hay empleados registrados',
            icon: 'error',
            customClass: {
              confirmButton: 'swal-button--confirm custom-color',
            },
          });
        }
      }
    });
  }

  abrirVentana(empleado: Empleado) {
    const dialogRef = this.ventana.open(VentanaEditarEmpleadoComponent, {
      width: '70%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: { empleado },
    });
  }
}
