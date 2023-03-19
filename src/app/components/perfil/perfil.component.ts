import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  abrirModalEditar(){

    $('#modalEditDepartamento').modal('show');
  }
  person = {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'jose',
    lastname: 'pepe',
    identification: '234324324',
    identificationType: 1,
    phone: '123213213',
    birthdate: new Date('2023-03-18T20:24:23.245Z'),
    city: 'panama',
    address: 'pepe',
    
  }; 
}
