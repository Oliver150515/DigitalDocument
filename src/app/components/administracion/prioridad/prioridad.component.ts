import { Component, OnInit } from '@angular/core';
import { Prioridad } from 'src/app/models/Prioridad.mode';
import { Sla } from 'src/app/models/Sla.model';
import { AdministracionService } from 'src/app/services/administracion.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-prioridad',
  templateUrl: './prioridad.component.html',
  styleUrls: ['./prioridad.component.css']
})
export class PrioridadComponent implements OnInit {
  public listadoPrioridad: Prioridad[] = [];
  public listadoTempPrioridad: Prioridad[] = [];
  public listadoSla: Sla[] = [];
  public listadoSlaActivos: Sla[] = [];
  public hoverShowed: boolean = true;
  public loading: boolean = false;
  public prioridadActual: Prioridad;
  public idUsuarioSesion: number;

 constructor(private administracionService: AdministracionService) { }

  ngOnInit() {
    this.getPrioridad();
    this.getSlas();
    this.idUsuarioSesion = JSON.parse(localStorage.getItem('user'))?.usuarioId;
  }

  getPrioridad(){
    this.loading = true;
    this.administracionService.getPrioridades().subscribe( (res: Prioridad[]) => {
      this.listadoPrioridad = res;
      this.loading = false;
      this.listadoTempPrioridad = this.listadoPrioridad;
    });
  }

  getSlas(){
    this.administracionService.getSlas().subscribe( (res: Sla[]) => {
       this.listadoSla = res;
       console.log(res);
    });
  }

  getSlaActivos(){
    this.administracionService.getSlasActivos().subscribe( (res: Sla[]) => {
      this.listadoSlaActivos = res;
    })
  }

  getNombreSlaById(id: number){
    return this.listadoSla.find( x=> x.slaId == id)?.descripcion;
  }

  buscar( termino: string){
    let arrayToReturn: any[] = [];
    termino = termino.toLowerCase();
    this.loading = true;
    for ( let i = 0; i < this.listadoTempPrioridad.length; i++) {
      let prioridad = this.listadoTempPrioridad[i];
      let nombre = prioridad.nombre.toLowerCase();
      if (nombre.indexOf(termino) >= 0) {
        arrayToReturn.push(prioridad);
      }
    }
    this.listadoPrioridad = arrayToReturn;
    this.loading = false;
    if(this.listadoPrioridad.length == 0){
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

  refrescarPrioridad(){
    this.getPrioridad();
  }

  abrirModalCrear(){
    this.getSlaActivos();
    $('#modalCreatePrioridad').modal('show');
  }

  abrirModalEditar(prioridad: Prioridad){
    this.getSlaActivos();
    this.prioridadActual = prioridad;
    $('#modalEditPrioridad').modal('show');
  }

  eliminarPrioridad(id: number, idUsuarioElimina: number){
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
        this.administracionService.deletePrioridad(id,idUsuarioElimina).subscribe( res => {
          swalWithBootstrapButtons.fire(
            'Eliminado',
            'El registro ha sido eliminado',
            'success'
          );
        this.refrescarPrioridad();
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
