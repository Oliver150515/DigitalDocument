import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //usuarios
  getUsers(){
    return this.http.get(this.baseUrl + 'usuario');
  }

  getUsuarioByDepartamentoId(id: any){
    return this.http.get(this.baseUrl + 'usuario/GetUsuarioByDepartamentoId?departamentoId='+id);
  }

  createUser(model: any){
    return this.http.post(this.baseUrl + 'usuario/Create', model);
  }

  editUser(model: any){
    return this.http.put(this.baseUrl + 'usuario/Edit', model);
  }

  deleteUser(id: any, idUsuarioElimina: any){
    return this.http.delete(this.baseUrl + 'usuario/Delete?id='+id+'&idUsuarioElimina='+idUsuarioElimina);
  }

  //departamentos
  getDepartamentos(){
    return this.http.get(this.baseUrl + 'departamento');
  }

  getDepartamentosActivos(){
    return this.http.get(this.baseUrl + 'departamento/DepartamentosActivos');
  }

  createDepartamento(model: any){
    return this.http.post(this.baseUrl + 'departamento/Create', model);
  }

  editDepartamento(model: any){
    return this.http.put(this.baseUrl + 'departamento/Edit', model);
  }

  deleteDepartamento(id: any, idUsuarioElimina: any){
    return this.http.delete(this.baseUrl + 'departamento/Delete?id='+id+'&idUsuarioElimina='+idUsuarioElimina);
  }

  //puestos
  getPuestos(){
    return this.http.get(this.baseUrl + 'puesto');
  }

  getPuestosActivos(){
    return this.http.get(this.baseUrl + 'puesto/PuestosActivos');
  }

  createPuesto(model: any){
    return this.http.post(this.baseUrl + 'puesto/Create', model);
  }

  editPuesto(model: any){
    return this.http.put(this.baseUrl + 'puesto/Edit', model);
  }

  deletePuesto(id: any, idUsuarioElimina: any){
    return this.http.delete(this.baseUrl + 'puesto/Delete?id='+id+'&idUsuarioElimina='+idUsuarioElimina);
  }

  //sla
  getSlas(){
    return this.http.get(this.baseUrl + 'sla');
  }

  getSlasActivos(){
    return this.http.get(this.baseUrl + 'sla/SlaActivos');
  }

  createSla(model: any){
    return this.http.post(this.baseUrl + 'sla/Create', model);
  }

  editSla(model: any){
    return this.http.put(this.baseUrl + 'sla/Edit', model);
  }

  deleteSla(id: any, idUsuarioElimina: any){
    return this.http.delete(this.baseUrl + 'sla/Delete?id='+id+'&idUsuarioElimina='+idUsuarioElimina);
  }

  //prioridad
  getPrioridades(){
    return this.http.get(this.baseUrl + 'prioridad');
  }

  getPrioridadesActivas(){
    return this.http.get(this.baseUrl + 'prioridad/PrioridadesActivas');
  }

  createPrioridad(model: any){
    return this.http.post(this.baseUrl + 'prioridad/Create', model);
  }

  editPrioridad(model: any){
    return this.http.put(this.baseUrl + 'prioridad/Edit', model);
  }

  deletePrioridad(id: any, idUsuarioElimina: any){
    return this.http.delete(this.baseUrl + 'prioridad/Delete?id='+id+'&idUsuarioElimina='+idUsuarioElimina);
  }

  //comentarios
  getComentarios(){
    return this.http.get(this.baseUrl + 'comentario');
  }

  getComentariosByIncidenteId(id: any){
    return this.http.get(this.baseUrl + 'comentarios/GetComentarioByIncidenteId?incidenteId='+id);
  }

  createComentario(model: any){
    return this.http.post(this.baseUrl + 'comentario/Create', model);
  }

}
