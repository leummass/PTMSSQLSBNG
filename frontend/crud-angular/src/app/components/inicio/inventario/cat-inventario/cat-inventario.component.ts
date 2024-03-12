import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Inventario } from '../../../../models/inventario.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { InventarioService } from '../../../../services/inventario.service';
import Swal from 'sweetalert2';
import { VentanaEditarInventarioComponent } from '../ventana-editar-inventario/ventana-editar-inventario.component';
import { MatDialog } from '@angular/material/dialog';

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
    private inventarioService: InventarioService,
    formBuilder: FormBuilder,
    public ventana: MatDialog
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
      fNombre: '',
      fSKU: '',
    });
    this.form.valueChanges.subscribe((value: {fNombre: any, fSKU: any}) => {
      const filter = [
         {fNombre: value.fNombre },
         {fSKU: value.fSKU },
        ];
      this.dataSource.filter = JSON.stringify(filter);
    });
  }

  ngOnInit() {
    this.obtenerInventario();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  obtenerInventario(){
    this.inventarioService.consultaInventario().subscribe(respuesta => {
      if(respuesta.data.Inventario){
        this.dataSource.data = respuesta.data.Inventario;
      }else{
        Swal.fire({title: 'Error', text: 'No hay elementos en el inventario', icon: 'error', customClass: {
          confirmButton: 'swal-button--confirm custom-color'
       }});
      }
    })
  }
  abrirVentana(inventario: Inventario) {
    const dialogRef = this.ventana.open(VentanaEditarInventarioComponent, {
      width: '70%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: { inventario },
    });
  }


}
