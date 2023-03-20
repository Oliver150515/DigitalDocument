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
  public data: {} = {};
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

      var  id=JSON.parse(localStorage.getItem('user'))?.usuarioId.toString();
    
      // this.model.birthdate = new Date(this.model.birthdate);
      
this.perfilService.resetPass(id,this.model).subscribe( res => {
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
