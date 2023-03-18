import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Prioridad } from 'src/app/models/Prioridad.mode';
import { Sla } from 'src/app/models/Sla.model';
import { AdministracionService } from 'src/app/services/administracion.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-editar-prioridad',
  templateUrl: './editar-prioridad.component.html',
  styleUrls: ['./editar-prioridad.component.css']
})
export class EditarPrioridadComponent implements OnInit {
  model: any = {};
  @Input() listadoSlaActivos: Sla[] = [];
  @Input() prioridadActual: Prioridad;
  @Output() newItemEvent = new EventEmitter<string>();
  public listadoSla: Sla[];

  constructor(private admintracionService: AdministracionService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.prioridadActual != undefined){
      this.model.slaId = this.prioridadActual.slaId;
      this.model.nombre = this.prioridadActual.nombre;
      this.model.estatus = this.prioridadActual.estatus;
    }

    if(this.listadoSlaActivos != undefined){
      this.listadoSla = this.listadoSlaActivos;
    }
    
  }

  refrescarPrioridad() {
    this.newItemEvent.emit();
  }

  modificarPrioridad(form: NgForm){
    if(form.valid){
        this.model.prioridadId = this.prioridadActual.prioridadId;
        this.model.borrado = this.prioridadActual.borrado;
        this.model.creadoPor = this.prioridadActual.creadoPor;
        this.model.fechaRegistro = this.prioridadActual.fechaRegistro;
        this.model.modificadoPor = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.admintracionService.editPrioridad(this.model).subscribe( res => {
          Swal.fire({
            icon: 'success',
            title: 'Prioridad modificada satisfactoriamente'
          });
          form.resetForm();
          this.cerrarModal();
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

  getSlaActivos(){
    return this.listadoSla.map(res => {
      var slas = {
        value: res.slaId,
        descripcion: res.descripcion
      }
      return slas;
    });
  }
  
  cerrarModal(){
    $('#modalEditPrioridad').modal('hide');
    
  }
}
