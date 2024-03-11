import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarEmpleadoComponent } from './empleado/buscar-empleado/buscar-empleado.component';
import { InicioComponent } from './inicio.component';
import { BuscarInventarioComponent } from './inventario/buscar-inventario/buscar-inventario.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BuscarPolizaComponent } from './poliza/buscar-poliza/buscar-poliza.component';
import { CatEmpleadoComponent } from './empleado/cat-empleado/cat-empleado.component';
import { CatInventarioComponent } from './inventario/cat-inventario/cat-inventario.component';
import { CatPolizaComponent } from './poliza/cat-poliza/cat-poliza.component';
import { SharedModule } from '../../shared/shared.module';
import { InicioRoutingModule } from './inicio-routing.module';




@NgModule({
  declarations: [
    InicioComponent,
    NavbarComponent,
    BuscarPolizaComponent,
    BuscarEmpleadoComponent,
    BuscarInventarioComponent,
    CatEmpleadoComponent,
    CatInventarioComponent,
    CatPolizaComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    SharedModule
  ]
})
export class InicioModule { }
