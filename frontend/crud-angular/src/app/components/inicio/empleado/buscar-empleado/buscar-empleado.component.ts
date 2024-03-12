import { Component } from '@angular/core';


@Component({
  selector: 'app-buscar-empleado',
  templateUrl: './buscar-empleado.component.html',
  styleUrl: './buscar-empleado.component.css'
})
export class BuscarEmpleadoComponent {
  recibeEmpleado: boolean = false;
  esUpdate: boolean = false;
  permiteConsulta: boolean = false;
  

  botonAnade(){
    this.recibeEmpleado = false;
    this.esUpdate = false;
    this.permiteConsulta = false;
  }

  botonCAE(){
    this.esUpdate = true;
    this.permiteConsulta = true;
    this.recibeEmpleado = false;
  }
}
