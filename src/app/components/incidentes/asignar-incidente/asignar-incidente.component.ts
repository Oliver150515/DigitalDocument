import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Incidente } from 'src/app/models/Incidente.model';
import { Usuario } from 'src/app/models/Usuario.model';
import { AdministracionService } from 'src/app/services/administracion.service';
import { IncidenteService } from 'src/app/services/incidente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-incidente',
  templateUrl: './asignar-incidente.component.html',
  styleUrls: ['./asignar-incidente.component.css']
})
export class AsignarIncidenteComponent implements OnInit {
  model: any = {};
  public listadoIncidentesSinAsignar: Incidente[] = [];
  public listadoUsuarios: Usuario[] = [];
  
  constructor(private incidenteService: IncidenteService, private administracionService: AdministracionService) { }

  ngOnInit() {
    this.getIncidenteSinAsignar();
  }

  getIncidenteSinAsignar(){
    this.incidenteService.getIncidentesSinAsignar().subscribe( (res: Incidente[]) => {
      this.listadoIncidentesSinAsignar = res;
    });
  }

  getUsuarios(id: any){
    if(id != undefined){
      this.listadoUsuarios = [];
      let idDepartamento = this.listadoIncidentesSinAsignar.find(x => x.incidenteId == id).departamentoId;
      this.administracionService.getUsuarioByDepartamentoId(idDepartamento).subscribe( (res: Usuario[]) => {
       this.listadoUsuarios = res;
      });
    }

  }

  agregarAsignacion(form: NgForm){
    if(form.valid){
        this.model.modificadoPor = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.incidenteService.asignarIncidente(this.model).subscribe( res => {
          Swal.fire({
            icon: 'success',
            title: 'Incidente asignado satisfactoriamente'
          });
          form.resetForm();
          this.limpiar(form);
          this.getIncidenteSinAsignar();
      }, error => {
        Swal.fire({
          icon: 'error',
          title: error.error
        });
      });
    }
  }

  limpiar(form: NgForm){
    form.resetForm();
    this.listadoUsuarios = [];
  }



}
