import { Component, OnInit } from '@angular/core';
import { Departamento } from 'src/app/models/Departamento.model';
import { AdministracionService } from 'src/app/services/administracion.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  public listadoDepartamento: Departamento[] = [];
  public listadoTempDepartamento: Departamento[] = [];
  public hoverShowed: boolean = true;
  public loading: boolean = false;
  public departamentoActual: Departamento;
  public idUsuarioSesion: number;

  constructor(private administracionService: AdministracionService) { }

  ngOnInit() {
    this.getDepartamentos();
    this.idUsuarioSesion = JSON.parse(localStorage.getItem('user'))?.usuarioId;
  }

  getDepartamentos(){
    this.loading = true;
    this.administracionService.getDepartamentos().subscribe( (res: Departamento[]) => {
      this.listadoDepartamento = res;
      this.loading = false;
      this.listadoTempDepartamento = this.listadoDepartamento;
    });
  }

  buscar( termino: string){
    let arrayToReturn: any[] = [];
    termino = termino.toLowerCase();
    this.loading = true;
    for ( let i = 0; i < this.listadoTempDepartamento.length; i++) {
      let departamento = this.listadoTempDepartamento[i];
      let nombre = departamento.nombre.toLowerCase();
      if (nombre.indexOf(termino) >= 0) {
        arrayToReturn.push(departamento);
      }
    }
    this.listadoDepartamento = arrayToReturn;
    this.loading = false;
    if(this.listadoDepartamento.length == 0){
      this.hoverShowed = false;
    } else{
      this.hoverShowed = true;
    }
  }


  getNombreStatusByCode(code: string){
    if(code == '0'){
      return 'Activo';
    }else{
      return 'Inactivo';
    }
  }

  refrescarDepartamentos(){
    this.getDepartamentos();
  }

  abrirModalCrear(){
    $('#modalCreateDepartamento').modal('show');
  }

  abrirModalEditar(departamento: Departamento){
    this.departamentoActual = departamento;
    $('#modalEditDepartamento').modal('show');
  }

  eliminarDepartamento(id: number, idUsuarioElimina: number){
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
        this.administracionService.deleteDepartamento(id,idUsuarioElimina).subscribe( res => {
          swalWithBootstrapButtons.fire(
            'Eliminado',
            'El registro ha sido eliminado',
            'success'
          );
        this.refrescarDepartamentos();
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
