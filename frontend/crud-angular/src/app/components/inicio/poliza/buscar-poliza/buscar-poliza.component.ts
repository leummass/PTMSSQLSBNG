import { Component } from '@angular/core';

@Component({
  selector: 'app-buscar-poliza',
  templateUrl: './buscar-poliza.component.html',
  styleUrl: './buscar-poliza.component.css'
})
export class BuscarPolizaComponent {
  recibePoliza: boolean = false;
  esUpdate: boolean = false;
  permiteConsulta: boolean = false;

  botonAnade(){
    this.recibePoliza = false;
    this.esUpdate = false;
    this.permiteConsulta = false;
  }

  botonCAE(){
    this.esUpdate = true;
    this.permiteConsulta = true;
    this.recibePoliza = false;
  }
}
