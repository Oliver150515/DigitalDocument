import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Incidente } from 'src/app/models/Incidente.model';
import { AdministracionService } from 'src/app/services/administracion.service';
import { IncidenteService } from 'src/app/services/incidente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cerrar-incidentes',
  templateUrl: './cerrar-incidentes.component.html',
  styleUrls: ['./cerrar-incidentes.component.css']
})
export class CerrarIncidentesComponent implements OnInit {

  model: any = {};
  public listadoIncidentesAsignados: Incidente[] = [];

  constructor(private incidenteService: IncidenteService, private administracionService: AdministracionService) { }

  ngOnInit() {
    this.getIncidenteAsignados();
  }

  getIncidenteAsignados(){
    this.incidenteService.getIncidentesAsignados().subscribe( (res: Incidente[]) => {
      this.listadoIncidentesAsignados = res;
    });
  }

  
  cerrarIncidente(form: NgForm){
    if(form.valid){
        this.model.modificadoPor = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.incidenteService.cerrarIncidente(this.model).subscribe( res => {
          Swal.fire({
            icon: 'success',
            title: 'Incidente cerrado satisfactoriamente'
          });
          form.resetForm();
          this.limpiar(form);
          this.getIncidenteAsignados();
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
  }


}
