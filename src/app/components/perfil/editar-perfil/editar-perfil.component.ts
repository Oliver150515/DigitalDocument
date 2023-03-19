import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import {PerfilService} from '../../../services/perfil.service';

declare var $: any;
@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  model: any = {};

  @Output() newItemEvent = new EventEmitter<string>();

  constructor(private perfilService: PerfilService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  refrescarDepartamentos() {
    this.newItemEvent.emit();
  }

  modificarDepartamento(form: NgForm){
    if(form.valid){

      this.model.id ="7F094C35-DC3A-4CF8-A058-38F7977D9310";
      this.model.identificationType=1;
      this.model.email = "xd@hotmail.com",
      this.model.password = "jss"
      // this.model.birthdate = new Date(this.model.birthdate);
      
this.perfilService.editPerfil(this.model).subscribe( res => {
  Swal.fire({
    icon: 'success',
    title: 'Departamento modificado satisfactoriamente'
  });
  form.resetForm();
  this.cerrarModal();
  this.refrescarDepartamentos();
}, error => {
Swal.fire({
  icon: 'error',
  title: error.error
});
});
    }
    console.log(form)
    console.log(this.model)
  }

  // getValorEstatus(){
  //   return [
  //   {
  //     value: '0',
  //     descripcion: 'cedula'
  //   },
  //   {
  //     value: '1',
  //     descripcion: 'pasaporte'
  //   }, ]
  // }

  cerrarModal(){
    $('#modalEditDepartamento').modal('hide');
    
  }

}
