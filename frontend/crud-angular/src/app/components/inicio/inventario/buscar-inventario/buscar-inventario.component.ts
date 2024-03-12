import { Component } from '@angular/core';

@Component({
  selector: 'app-buscar-inventario',
  templateUrl: './buscar-inventario.component.html',
  styleUrl: './buscar-inventario.component.css'
})
export class BuscarInventarioComponent {
  recibeInventario: boolean = false;
  esUpdate: boolean = false;
  permiteConsulta: boolean = false;

  botonAnade(){
    this.recibeInventario = false;
    this.esUpdate = false;
    this.permiteConsulta = false;
  }

  botonCAE(){
    this.esUpdate = true;
    this.permiteConsulta = true;
    this.recibeInventario = false;
  }
}
