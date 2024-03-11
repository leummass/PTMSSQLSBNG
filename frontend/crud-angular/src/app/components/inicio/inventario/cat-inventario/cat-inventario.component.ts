import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Inventario } from '../../../../models/inventario.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cat-inventario',
  templateUrl: './cat-inventario.component.html',
  styleUrl: './cat-inventario.component.css'
})
export class CatInventarioComponent {
  displayedColumns: string[] = ['SKU', 'Nombre', 'Cantidad'];
  dataSource = new MatTableDataSource<Inventario>();
  form: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    formBuilder: FormBuilder
  ) {
    this.dataSource.filterPredicate = ((data, filter) => {
      const filters = JSON.parse(filter);
      const a = !filters[1].fSKU || data.sku.includes(filters[1].fSKU);
      const b =
        !filters[0].fNombre ||
        data.nombre.toLowerCase().includes(filters[0].fNombre);
      return a && b;
    }) as (Inventario: Inventario, string: string) => boolean;

    this.form = formBuilder.group({
      fSKU: '',
      fNombre: '',
    });
    this.form.valueChanges.subscribe((value) => {
      const filter = [
        { fNombre: value.fNombre },
        { fSKU: value.fSKU },

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

  obtenerDetalleServidor() {
    
  }

  abrirVentanaAgregar(){

  }
  abrirVentanaEditar(){

  }

}
