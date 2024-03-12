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
import { FormularioEmpleadoComponent } from './empleado/formulario-empleado/formulario-empleado.component';
import { VentanaEditarEmpleadoComponent } from './empleado/ventana-editar-empleado/ventana-editar-empleado.component';
import { FormularioInventarioComponent } from './inventario/formulario-inventario/formulario-inventario.component';
import { VentanaEditarInventarioComponent } from './inventario/ventana-editar-inventario/ventana-editar-inventario.component';
import { VentanaEditarPolizaComponent } from './poliza/ventana-editar-poliza/ventana-editar-poliza.component';
import { FormularioPolizaComponent } from './poliza/formulario-poliza/formulario-poliza.component';




@NgModule({
  declarations: [
    InicioComponent,
    NavbarComponent,
    BuscarPolizaComponent,
    BuscarEmpleadoComponent,
    BuscarInventarioComponent,
    CatEmpleadoComponent,
    CatInventarioComponent,
    CatPolizaComponent,
    FormularioEmpleadoComponent,
    VentanaEditarEmpleadoComponent,
    FormularioInventarioComponent,
    VentanaEditarInventarioComponent,
    VentanaEditarPolizaComponent,
    FormularioPolizaComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    SharedModule
  ]
})
export class InicioModule { }
