import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Comentario } from 'src/app/models/Comentario.mode';
import { Departamento } from 'src/app/models/Departamento.model';
import { Incidente } from 'src/app/models/Incidente.model';
import { Prioridad } from 'src/app/models/Prioridad.mode';
import { Usuario } from 'src/app/models/Usuario.model';
import { AdministracionService } from 'src/app/services/administracion.service';
import { IncidenteService } from 'src/app/services/incidente.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-solicitud-incidente',
  templateUrl: './solicitud-incidente.component.html',
  styleUrls: ['./solicitud-incidente.component.css']
})
export class SolicitudIncidenteComponent implements OnInit {
  model: any = {};
  public listadoIncidente: Incidente[] = [];
  public listadoTempIncidente: Incidente[] = [];
  public hoverShowed: boolean = true;
  public loading: boolean = false;
  public incidenteActual: Incidente;
  public idUsuarioSesion: number;
  public listadoDepartamentosActivos: Departamento[] = [];
  public listadoPrioridadesActivas: Prioridad[] = [];
  public listadoUsuarios: Usuario[] = [];
  public listadoPrioridades: Prioridad[] = [];
  public listadoDepartamentos: Departamento[] = [];
  public listadoComentarios: Comentario[] = [];
  public isfull: boolean = false;
  constructor(private admintracionService: AdministracionService, private incidenteService: IncidenteService) { }

  ngOnInit() {
    this.getIncidentesActivos();
    this.getUsuarios();
    this.getDepartamentos();
    this.getPrioridades();
    this.getDepartamentosActivos();
    this.getPrioridadesActivas();
    this.idUsuarioSesion = JSON.parse(localStorage.getItem('user'))?.usuarioId;

  }

  getIncidentesActivos(){
    this.loading = true;
    this.incidenteService.getIncidentesActivos().subscribe( (res: Incidente[]) => {
      this.listadoIncidente = res;
      this.listadoTempIncidente = this.listadoIncidente;
      this.loading = false;
      if(this.listadoIncidente.length > 0){
        this.isfull = true;
      }
    });
  }

  //inputs para agregar y editar incidente
  getDepartamentosActivos(){
    this.admintracionService.getDepartamentosActivos().subscribe( (res: Departamento[]) => {
      this.listadoDepartamentosActivos = res;
    })
  }

  getPrioridadesActivas(){
    this.admintracionService.getPrioridadesActivas().subscribe( (res: Prioridad[]) => {
      this.listadoPrioridadesActivas = res;
    })
  }

  // metodos para la busqueda de las listas para la busqueda del nombre de las columnas en la tabla
  getUsuarios(){
    this.admintracionService.getUsers().subscribe( (res: Usuario[]) => {
      this.listadoUsuarios = res;
    });
  }

  getPrioridades(){
    this.admintracionService.getPrioridades().subscribe( (res: Prioridad[]) => {
      this.listadoPrioridades = res;
    });
  }

  getDepartamentos(){
    this.admintracionService.getDepartamentos().subscribe( (res: Departamento[]) => {
      this.listadoDepartamentos = res;
    });
  }

  // metodos para la busqueda de nombres para las columnas de la tabla
  getNombreStatusByCode(code: string){
    if(code == '0'){
      return 'Activo';
    }else{
      return 'Inactivo';
    }
  }

  getNombreUsuarioReportaById(id: any){
    if(id == null){
      return 'Sin Asignar';
    }else{
      return this.listadoUsuarios.find( x => x.usuarioId == id)?.nombreUsuario;
    }
  }

  getNombreUsuarioAsignadoById(id: any){
    if(id == null){
      return 'Sin Asignar';
    }else{
      return this.listadoUsuarios.find( x => x.usuarioId == id)?.nombreUsuario;
    }
  }

  getPrioridadById(id: any){
    if(id == null){
      return 'Sin Asignar';
    }else{
      return this.listadoPrioridades.find( x => x.prioridadId == id)?.nombre;
    }
  }

  getDepartamentoById(id: any){
    if(id == null){
      return 'Sin Asignar';
    }else{
      return this.listadoDepartamentos.find( x => x.departamentoId == id)?.nombre;
    }
  }

  buscar( termino: string){
    let arrayToReturn: any[] = [];
    termino = termino.toLowerCase();
    this.loading = true;
    for ( let i = 0; i < this.listadoTempIncidente.length; i++) {
      let incidente = this.listadoTempIncidente[i];
      let titulo = incidente.titulo.toLowerCase();
      if (titulo.indexOf(termino) >= 0) {
        arrayToReturn.push(incidente);
      }
    }
    this.listadoIncidente = arrayToReturn;
    this.loading = false;
    if(this.listadoIncidente.length == 0){
      this.hoverShowed = false;
    } else{
      this.hoverShowed = true;
    }
  }

  refrescarIncidentes(){
    this.getIncidentesActivos();
  }

  abrirModalCrear(){
    this.getDepartamentosActivos();
    this.getPrioridadesActivas();
    $('#modalCreateIncidente').modal('show');
  }

  abrirModalEditar(incidente: Incidente){
    this.getDepartamentosActivos();
    this.incidenteActual = incidente;
    $('#modalEditIncidente').modal('show');
  }

  eliminarIncidente(id: number, idUsuarioElimina: number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mr-2',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    
    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir este cambio!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.incidenteService.deleteIncidente(id,idUsuarioElimina).subscribe( res => {
          swalWithBootstrapButtons.fire(
            'Eliminado',
            'El registro ha sido eliminado',
            'success'
          );
        this.refrescarIncidentes();
        }, error => {
          Swal.fire({
            icon: 'error',
            title: error.error
          });
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El registro NO se ha eliminado',
          'error'
        )
      }
    });
  }

  needSeeButton(descripcion: string){
    let cantidadCaracteres = descripcion.length;
    if(cantidadCaracteres > 49){
      return true;
    }else{
      return false;
    }
  }

  verMas(descripcion: string){
    Swal.fire({
      title: descripcion
    });
  }

  verComentarios(incidenteId: any){
    this.incidenteService.getComentariosByIncidenteId(incidenteId).subscribe( (res: Comentario[]) => {
      this.listadoComentarios = res;
      $('#exampleModalCenter2').modal('show');
    });
  }

  cerrarModal2(){
    $('#exampleModalCenter2').modal('hide');
  }

  
}
