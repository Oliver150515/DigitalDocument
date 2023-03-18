import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Departamento } from 'src/app/models/Departamento.model';
import { Prioridad } from 'src/app/models/Prioridad.mode';
import { IncidenteService } from 'src/app/services/incidente.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-agregar-incidente',
  templateUrl: './agregar-incidente.component.html',
  styleUrls: ['./agregar-incidente.component.css']
})
export class AgregarIncidenteComponent implements OnInit {
  model: any = {};
  @Input() listadoDepartamentosActivos: Departamento[] = [];
  @Input() listadoPrioridadesActivas: Prioridad[] = [];
  @Output() newItemEvent = new EventEmitter<string>();

  constructor(private incidenteService: IncidenteService) { }

  ngOnInit() {
  }

  refrescarIncidentes() {
    this.newItemEvent.emit();
  }

  crearIncidente(form: NgForm){
    if(form.valid){
        this.model.borrado = false;
        this.model.estatus = "0";
        this.model.usuarioReportaId = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.model.creadoPor = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.model.modificadoPor = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.incidenteService.createIncidente(this.model).subscribe( res => {
            Swal.fire({
              icon: 'success',
              title: 'Incidente creado satisfactoriamente'
            });
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
  
  cerrarModal(form: NgForm){
    form.resetForm();
    $('#modalCreateIncidente').modal('hide');
  }

}
