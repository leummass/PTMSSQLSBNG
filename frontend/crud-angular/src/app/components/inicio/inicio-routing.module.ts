import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InicioComponent } from "./inicio.component";
import { CatEmpleadoComponent } from "./empleado/cat-empleado/cat-empleado.component";
import { BuscarEmpleadoComponent } from "./empleado/buscar-empleado/buscar-empleado.component";
import { CatInventarioComponent } from "./inventario/cat-inventario/cat-inventario.component";
import { BuscarInventarioComponent } from "./inventario/buscar-inventario/buscar-inventario.component";
import { CatPolizaComponent } from "./poliza/cat-poliza/cat-poliza.component";
import { BuscarPolizaComponent } from "./poliza/buscar-poliza/buscar-poliza.component";

const routes: Routes = [
    {path: '', component: InicioComponent, children: [
        {path: 'cat_empleado', component: CatEmpleadoComponent},
        {path: 'buscar_empleado', component: BuscarEmpleadoComponent},
        {path: 'cat_inventario', component: CatInventarioComponent},
        {path: 'buscar_inventario', component: BuscarInventarioComponent},
        {path: 'cat_poliza', component: CatPolizaComponent},
        {path: 'buscar_poliza', component: BuscarPolizaComponent},
    ]}
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InicioRoutingModule{

}