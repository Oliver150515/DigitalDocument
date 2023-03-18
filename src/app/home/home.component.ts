import { Component, OnInit } from '@angular/core';
import { Incidente } from '../models/Incidente.model';
import { IncidenteService } from '../services/incidente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public totalIncidenteAbiertos: any;
  public misIncidentes: any
  usuarioIdSesion = JSON.parse(localStorage.getItem('user'))?.usuarioId;
  constructor(private incidenteService: IncidenteService) { }

  ngOnInit() {
  }

  getTotalIncidentes(){
    this.incidenteService.getIncidentesActivos().subscribe( (res: Incidente[]) => {
      this.totalIncidenteAbiertos = res.length;
    });
  }

  getMisIncidentes(){
    this.incidenteService.getIncidentesAsignadoByUser(this.usuarioIdSesion).subscribe( (res:Incidente[]) => {
      this.misIncidentes = res.length;
    })
  }



}
