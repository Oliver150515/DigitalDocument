import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Sla } from 'src/app/models/Sla.model';
import { AdministracionService } from 'src/app/services/administracion.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-agregar-prioridad',
  templateUrl: './agregar-prioridad.component.html',
  styleUrls: ['./agregar-prioridad.component.css']
})
export class AgregarPrioridadComponent implements OnInit {
  model: any = {};
  @Input() listadoSlaActivos: Sla[] = [];
  @Output() newItemEvent = new EventEmitter<string>();

  constructor(private admintracionService: AdministracionService) { }

  ngOnInit() {
  }

  refrescarPrioridad() {
    this.newItemEvent.emit();
  }

  agregarPrioridad(form: NgForm){
    if(form.valid){
        this.model.borrado = false;
        this.model.creadoPor = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.model.modificadoPor = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.admintracionService.createPrioridad(this.model).subscribe( res => {
            Swal.fire({
              icon: 'success',
              title: 'Prioridad creada satisfactoriamente'
            });
            this.cerrarModal(form);
            this.refrescarPrioridad();
        }, error => {
          Swal.fire({
            icon: 'error',
            title: error.error
          });
        });

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Favor de llenar los campos solicitados'
      });
    }
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
  
  cerrarModal(form: NgForm){
    form.resetForm();
    $('#modalCreatePrioridad').modal('hide');
  }

  getSlaActivos(){
    return this.listadoSlaActivos.map(res => {
      var slas = {
        value: res.slaId,
        descripcion: res.descripcion
      }
      return slas;
    });
  }
  
}
