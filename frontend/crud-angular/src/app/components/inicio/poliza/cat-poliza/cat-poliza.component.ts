import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Poliza } from '../../../../models/poliza.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { PolizaService } from '../../../../services/poliza.service';
import Swal from 'sweetalert2';
import { VentanaEditarPolizaComponent } from '../ventana-editar-poliza/ventana-editar-poliza.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cat-poliza',
  templateUrl: './cat-poliza.component.html',
  styleUrl: './cat-poliza.component.css',
})
export class CatPolizaComponent {
  displayedColumns: string[] = [
    'IdPolizas',
    'EmpleadoGenero',
    'SKU',
    'Cantidad',
    'Fecha',
  ];
  dataSource = new MatTableDataSource<Poliza>();
  form: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    formBuilder: FormBuilder,
    private polizaService: PolizaService,
    public ventana: MatDialog
  ) {
    this.dataSource.filterPredicate = ((data, filter) => {
      const filters = JSON.parse(filter);
      const a =
        !filters[1].fEmpleadoGenero ||
        String(data.empleadogenero)
          .toLowerCase()
          .includes(String(filters[1].fEmpleadoGenero));
      const b =
        !filters[0].fIdPolizas ||
        String(data.idpolizas).toLowerCase().includes(filters[0].fIdPolizas);
      let c =
        !filters[2].fSKU || data.sku.toLowerCase().includes(filters[2].fSKU);
      let d = !filters[3].fFecha || data.fecha.includes(filters[3].fFecha);
      return a && b && c && d;
    }) as (Poliza: Poliza, string: string) => boolean;

    this.form = formBuilder.group({
      fIdPolizas: '',
      fEmpleadoGenero: '',
      fSKU: '',
      fFecha: '',
    });
    this.form.valueChanges.subscribe(
      (value: {
        fIdPolizas: any;
        fEmpleadoGenero: any;
        fSKU: any;
        fFecha: any;
      }) => {
        const filter = [
          { fIdPolizas: value.fIdPolizas },
          { fEmpleadoGenero: value.fEmpleadoGenero },
          { fSKU: value.fSKU },
          { fFecha: value.fFecha },
        ];
        this.dataSource.filter = JSON.stringify(filter);
      }
    );
  }

  ngOnInit() {
    this.obtenerPolizas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  obtenerPolizas() {
    this.polizaService.consultaPolizas().subscribe((respuesta) => {
      if (respuesta) {
        this.dataSource.data = respuesta.data.Polizas;
        if (this.dataSource.data.length === 0) {
          Swal.fire({
            title: 'Error',
            text: 'No se hay polizas registradas',
            icon: 'error',
            customClass: {
              confirmButton: 'swal-button--confirm custom-color',
            },
          });
        }
      }
    });
  }

  abrirVentana(poliza: Poliza) {
    const dialogRef = this.ventana.open(VentanaEditarPolizaComponent, {
      width: '70%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: { poliza },
    });
  }
}
