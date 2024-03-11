import { Component, ViewChild } from '@angular/core';
import { Empleado } from '../../../../models/empleado.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cat-empleado',
  templateUrl: './cat-empleado.component.html',
  styleUrl: './cat-empleado.component.css'
})
export class CatEmpleadoComponent {
  displayedColumns: string[] = ['ID', 'Nombre', 'Apellido', 'Puesto'];
  dataSource = new MatTableDataSource<Empleado>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(){}

  ngOnInit(){
    this.obtenerServicios();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  obtenerServicios(){
    
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  abrirVentanaAgregar(){
    
  }
}
