import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncidenteService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //incidentes
  getIncidentes(){
    return this.http.get(this.baseUrl + 'incidente');
  }

  getIncidentesActivos(){
    return this.http.get(this.baseUrl + 'incidente/GetIncidentesActivos');
  }

  getIncidentesSinAsignar(){
    return this.http.get(this.baseUrl + 'incidente/GetIncidentesSinAsignar');
  }

  getIncidentesAsignados(){
    return this.http.get(this.baseUrl + 'incidente/GetIncidentesAsignados');
  }

  getIncidentesAsignadoByUser(id: any){
    return this.http.get(this.baseUrl + 'incidente/GetIncidentesAsignadoByUser?usuarioId='+id);
  }

  getHistorialSolicitudesByUser(id: any){
    return this.http.get(this.baseUrl + 'incidente/GetHistorialSolicitudesByUser?usuarioId='+id);
  }

  createIncidente(model: any){
    return this.http.post(this.baseUrl + 'incidente/Create', model);
  }

  editIncidente(model: any){
    return this.http.put(this.baseUrl + 'incidente/Edit', model);
  }

  deleteIncidente(id: any, idUsuarioElimina: any){
    return this.http.delete(this.baseUrl + 'incidente/Delete?id='+id+'&idUsuarioElimina='+idUsuarioElimina);
  }

  asignarIncidente(model: any){
    return this.http.put(this.baseUrl + 'incidente/AsignarIncidente', model);
  }

  cerrarIncidente(model: any){
    return this.http.put(this.baseUrl + 'incidente/CerrarIncidente', model);
  }

  //comentarios
  getComentariosByIncidenteId(id: any){
    return this.http.get(this.baseUrl + 'comentario/GetComentarioByIncidenteId?incidenteId='+id);
  }

  createComentario(model: any){
    return this.http.post(this.baseUrl + 'comentario/Create', model);
  }

}
