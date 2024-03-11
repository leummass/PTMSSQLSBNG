import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Poliza } from '../../../../models/poliza.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

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

  constructor(formBuilder: FormBuilder) {
    this.dataSource.filterPredicate = ((data, filter) => {
      const filters = JSON.parse(filter);
      const a = !filters[1].fEmpleadoGenero || data.empleadogenero === filters[3].fEmpleadoGenero
      const b =
        !filters[0].fIdPolizas ||
        data.idpolizas === filters[0].fIdPolizas;
      let c = !filters[2].fSKU || data.sku.includes(filters[1].fSKU);
      let d = !filters[3].fCantidad || data.cantidad === filters[3].fCantidad
      let e = !filters[4].fFecha || data.sku.includes(filters[4].fFecha);
      return a && b && c && d && e;
    }) as (Poliza: Poliza, string: string) => boolean;

    this.form = formBuilder.group({
      fIdPolizas: '',
      fEmpleadoGenero: '',
      fSKU: '',
      fCantidad: 0,
      fFecha: '',
    });
    this.form.valueChanges.subscribe((value) => {
      const filter = [
        { fIdPolizas: value.fIdPolizas },
        { fEmpleadoGenero: value.fEmpleadoGenero },
        { fSKU: value.fSKU },
        { fCantidad: value.fCantidad },
        { fFecha: value.fFecha },
      ];
      this.dataSource.filter = JSON.stringify(filter);
    });
  }

  ngOnInit() {
    this.obtenerServidores();
    this.obtenerDetalleServidor();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  obtenerServidores() {
    const params = { nombre: '', ipdireccion: '', tipo: '' };
  }

  obtenerDetalleServidor() {}

  abrirVentanaAgregar() {}
  abrirVentanaEditar() {}
}
