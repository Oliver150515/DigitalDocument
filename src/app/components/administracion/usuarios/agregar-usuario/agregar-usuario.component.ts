import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { retry } from 'rxjs/operators';
import { Puesto } from 'src/app/models/Puesto.model';
import { AdministracionService } from 'src/app/services/administracion.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {
  model: any = {};
  @Input() listadoPuestosActivos: Puesto[] = [];
  @Output() newItemEvent = new EventEmitter<string>();
  constructor(private admintracionService: AdministracionService) { }

  ngOnInit() {
  }

  refrescarUsuarios() {
    this.newItemEvent.emit();
  }

  agregarUsuario(form: NgForm){
    console.log(form);
    if(form.valid){  
        this.model.borrado = false;
        this.model.creadoPor = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.model.modificadoPor = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.admintracionService.createUser(this.model).subscribe( res => {
            Swal.fire({
              icon: 'success',
              title: 'Usuario creado satisfactoriamente'
            });
            this.cerrarModal(form);
            this.refrescarUsuarios();
        }, error => {
          console.log(error);
            Swal.fire({
              icon: 'error',
              title: error.error
            });
        });
      
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Campos incorrectos'
      });
    }
  }

  getPuestos(){
    this.admintracionService.getPuestos().subscribe( res => {
      console.log(res);
    });
  }

  getValorEstatus(){
    return [
    {
      value: '0',
      descripcion: 'Activo'
    },
    {
      value: '1',
      descripcion: 'Inactivo'
    }, ]
  }

  getPuestosActivos(){
    return this.listadoPuestosActivos.map(res => {
      var puestos = {
        value: res.puestoId,
        descripcion: res.nombre
      }
      return puestos;
    });
  }
  
  cerrarModal(form: NgForm){
    form.resetForm();
    $('#modalCreateUser').modal('hide');
  }

}
