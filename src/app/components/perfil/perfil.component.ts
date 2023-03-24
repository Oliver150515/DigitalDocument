import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import {PerfilService} from '../../services/perfil.service';
declare var $: any;
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  model: any = {};
  public data: {} = {};

  constructor(private perfilService: PerfilService) { }
  ngOnInit(): void {
    this.getPerfil();
  }
  getPerfil(){
   
    var  id=JSON.parse(localStorage.getItem('user'))?.usuarioId.toString();
    this.perfilService.getPerfil(id).subscribe(
     res=>{
 
 this.model=res;

     }
    )
 
 
   }
  abrirModalEditar(){

    $('#modalEditDepartamento').modal('show');
  }
  modificarDepartamento(form: NgForm){
    if(form.valid){

      //this.model.id ="7F094C35-DC3A-4CF8-A058-38F7977D9310";
      this.model.id = JSON.parse(localStorage.getItem('user'))?.usuarioId.toString();
      this.model.identificationType=1;
      this.model.email = JSON.parse(localStorage.getItem('user'))?.email.toString();
      this.model.roleId = "b6c977e9-09da-4454-94b1-58c22a7da7ab";
      
      
this.perfilService.editPerfil(this.model).subscribe( res => {
  Swal.fire({
    icon: 'success',
    title: 'Perfil modificado satisfactoriamente'
  });
  form.resetForm();
  this.getPerfil();
}, error => {
Swal.fire({
  icon: 'error',
  title: error.error
});
});
    }
    
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
