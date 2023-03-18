import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.component.html',
  styleUrls: ['./metodo-pago.component.css']
})
export class MetodoPagoComponent implements OnInit {
  
  public mensaje: boolean = false;
  public error: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  pagando(){
    this.mensaje = true;
  }

}
