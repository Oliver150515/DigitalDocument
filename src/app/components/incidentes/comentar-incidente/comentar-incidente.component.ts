import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Incidente } from 'src/app/models/Incidente.model';
import { AdministracionService } from 'src/app/services/administracion.service';
import { IncidenteService } from 'src/app/services/incidente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comentar-incidente',
  templateUrl: './comentar-incidente.component.html',
  styleUrls: ['./comentar-incidente.component.css']
})
export class ComentarIncidenteComponent implements OnInit {
  model: any = {};
  public listadoIncidentesActivos: Incidente[] = [];

  constructor(private incidenteService: IncidenteService, private administracionService: AdministracionService) { }

  ngOnInit() {
    this.getIncidenteAsignados();
  }

  getIncidenteAsignados(){
    this.incidenteService.getIncidentesActivos().subscribe( (res: Incidente[]) => {
      this.listadoIncidentesActivos = res;
    });
  }

  
  comentarIncidente(form: NgForm){
    if(form.valid){
        this.model.borrado = false;
        this.model.estatus = "0";
        this.model.usuarioComentaId = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.model.creadoPor = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.model.modificadoPor = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.incidenteService.createComentario(this.model).subscribe( res => {
          Swal.fire({
            icon: 'success',
            title: 'Comentario creado satisfactoriamente'
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
