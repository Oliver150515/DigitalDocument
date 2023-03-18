import { Component, OnInit } from '@angular/core';
import { Departamento } from 'src/app/models/Departamento.model';
import { Puesto } from 'src/app/models/Puesto.model';
import { AdministracionService } from 'src/app/services/administracion.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html',
  styleUrls: ['./puestos.component.css']
})
export class PuestosComponent implements OnInit {
  public listadoPuesto: Puesto[] = [];
  public listadoTempPuesto: Puesto[] = [];
  public listadoDepartamento: Departamento[] = [];
  public listadoDepartamentosActivos: Departamento[] = [];
  public hoverShowed: boolean = true;
  public loading: boolean = false;
  public puestoActual: Puesto;
  public idUsuarioSesion: number;

  constructor(private administracionService: AdministracionService) { }

  ngOnInit() {
    this.getPuestos();
    this.getDepartamentos();
    this.idUsuarioSesion = JSON.parse(localStorage.getItem('user'))?.usuarioId;
  }

  getPuestos(){
    this.loading = true;
    this.administracionService.getPuestos().subscribe( (res: Puesto[]) => {
      this.listadoPuesto = res;
      this.loading = false;
      this.listadoTempPuesto = this.listadoPuesto;
    });
  }

  getDepartamentos(){
    this.administracionService.getDepartamentos().subscribe( (res: Departamento[]) => {
       this.listadoDepartamento = res;
    });
  }

  getDepartamentosActivos(){
    this.administracionService.getDepartamentosActivos().subscribe( (res: Departamento[]) => {
      this.listadoDepartamentosActivos = res;
    })
  }

  getNombreDepartamentoById(id: number){
    return this.listadoDepartamento.find( x=> x.departamentoId == id)?.nombre;
  }

  buscar( termino: string){
    let arrayToReturn: any[] = [];
    termino = termino.toLowerCase();
    this.loading = true;
    for ( let i = 0; i < this.listadoTempPuesto.length; i++) {
      let puesto = this.listadoTempPuesto[i];
      let nombre = puesto.nombre.toLowerCase();
      if (nombre.indexOf(termino) >= 0) {
        arrayToReturn.push(puesto);
      }
    }
    this.listadoPuesto = arrayToReturn;
    this.loading = false;
    if(this.listadoPuesto.length == 0){
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

  refrescarPuestos(){
    this.getPuestos();
  }

  abrirModalCrear(){
    this.getDepartamentosActivos();
    $('#modalCreatePuesto').modal('show');
  }

  abrirModalEditar(puesto: Puesto){
    this.getDepartamentosActivos();
    this.puestoActual = puesto;
    $('#modalEditPuesto').modal('show');
  }

  eliminarPuesto(id: number, idUsuarioElimina: number){
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
        this.administracionService.deletePuesto(id,idUsuarioElimina).subscribe( res => {
          swalWithBootstrapButtons.fire(
            'Eliminado',
            'El registro ha sido eliminado',
            'success'
          );
        this.refrescarPuestos();
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

}
