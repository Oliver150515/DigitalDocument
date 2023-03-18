import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Puesto } from 'src/app/models/Puesto.model';
import { Usuario } from 'src/app/models/Usuario.model';
import { AdministracionService } from 'src/app/services/administracion.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public listadoUsuario: Usuario[] = [];
  public listadoTempUsuario: Usuario[] = [];
  public hoverShowed: boolean = true;
  public loading: boolean = false;
  public listadoPuesto: Puesto[] = [];
  public listadoPuestoActivos: Puesto[] = [];
  public usuarioActual: Usuario;
  public idUsuarioSesion: number;
  
  constructor(private administracionService: AdministracionService) { }

  ngOnInit() {
    this.getUser();
    this.getPuestos();
    this.idUsuarioSesion = JSON.parse(localStorage.getItem('user'))?.usuarioId;
  }

  getUser(){
    this.loading = true;
    this.administracionService.getUsers().subscribe( (res: Usuario[]) => {
      this.listadoUsuario = res;
      this.loading = false;
      this.listadoTempUsuario = this.listadoUsuario;
    });
  }

  buscar( termino: string){
    let arrayToReturn: any[] = [];
    termino = termino.toLowerCase();
    this.loading = true;
    for ( let i = 0; i < this.listadoTempUsuario.length; i++) {
      let usuario = this.listadoTempUsuario[i];
      let nombre = usuario.nombreUsuario.toLowerCase();
      if (nombre.indexOf(termino) >= 0) {
        arrayToReturn.push(usuario);
      }
    }
    this.listadoUsuario = arrayToReturn;
    this.loading = false;
    if(this.listadoUsuario.length == 0){
      this.hoverShowed = false;
    } else{
      this.hoverShowed = true;
    }
  }

  getPuestos(){
    this.administracionService.getPuestos().subscribe( (res: Puesto[]) => {
       this.listadoPuesto = res;
    });
  }

  getPuestosActivos(){
    this.administracionService.getPuestosActivos().subscribe( (res: Puesto[]) => {
      this.listadoPuestoActivos = res;
    })
  }

  getNombrePuestoById(id: number){
    return this.listadoPuesto.find( x=> x.puestoId == id)?.nombre;
  }

  getNombreStatusByCode(code: string){
    if(code == '0'){
      return 'Activo';
    }else{
      return 'Inactivo';
    }
  }

  refrescarUsuarios(){
    this.getUser();
  }

  abrirModalCrear(){
    this.getPuestosActivos();
      $('#modalCreateUser').modal('show');
  }

  abrirModalEditar(usuario: Usuario){
    this.getPuestosActivos();
    this.usuarioActual = usuario;
    $('#modalEditUser').modal('show');
  }

  eliminarUsuario(id: number, idUsuarioElimina: number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mr-2',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir este cambio!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.administracionService.deleteUser(id, idUsuarioElimina).subscribe( res => {
          swalWithBootstrapButtons.fire(
            'Eliminado',
            'El registro ha sido eliminado',
            'success'
          );
        this.refrescarUsuarios();
        }, error => {
          Swal.fire({
            icon: 'error',
            title: error.error
          });
        });
      } else if (
        /* Read more about handling dismissals below */
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
}
