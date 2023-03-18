import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Departamento } from 'src/app/models/Departamento.model';
import { Incidente } from 'src/app/models/Incidente.model';
import { Prioridad } from 'src/app/models/Prioridad.mode';
import { IncidenteService } from 'src/app/services/incidente.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-editar-incidente',
  templateUrl: './editar-incidente.component.html',
  styleUrls: ['./editar-incidente.component.css']
})
export class EditarIncidenteComponent implements OnInit {
  model: any = {};
  @Input() listadoDepartamentosActivos: Departamento[] = [];
  @Input() listadoPrioridadesActivas: Prioridad[] = [];
  @Input() incidenteActual: Incidente;
  @Output() newItemEvent = new EventEmitter<string>();
  public listadoDepartamento: Departamento[];
  
  constructor(private incidenteService: IncidenteService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.incidenteActual != undefined){
      this.model.departamentoId = this.incidenteActual.departamentoId;
      this.model.prioridadId = this.incidenteActual.prioridadId;
      this.model.titulo = this.incidenteActual.titulo;
      this.model.descripcion = this.incidenteActual.descripcion;
    }

    if(this.listadoDepartamentosActivos != undefined){
      this.listadoDepartamento = this.listadoDepartamentosActivos;
    }
    
  }

  refrescarIncidentes() {
    this.newItemEvent.emit();
  }

  modificarIncidente(form: NgForm){
    if(form.valid){
        this.model.incidenteId = this.incidenteActual.incidenteId;
        this.model.estatus = "0";
        this.model.usuarioReportaId = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.model.borrado = this.incidenteActual.borrado;
        this.model.creadoPor = this.incidenteActual.creadoPor;
        this.model.fechaRegistro = this.incidenteActual.fechaRegistro;
        this.model.modificadoPor = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.incidenteService.editIncidente(this.model).subscribe( res => {
          Swal.fire({
            icon: 'success',
            title: 'Incidente modificado satisfactoriamente'
          });
          form.resetForm();
          this.cerrarModal(form);
          this.refrescarIncidentes();
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

  
  getDepartamentosActivos(){
    return this.listadoDepartamento.map(res => {
      var departamentos = {
        value: res.departamentoId,
        descripcion: res.nombre
      }
      return departamentos;
    });
  }
  
  cerrarModal(form: NgForm){
    form.resetForm();
    $('#modalEditIncidente').modal('hide');
    
  }

}
