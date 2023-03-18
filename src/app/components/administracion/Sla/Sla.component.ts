import { Component, OnInit } from '@angular/core';
import { Sla } from 'src/app/models/Sla.model';
import { AdministracionService } from 'src/app/services/administracion.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-Sla',
  templateUrl: './Sla.component.html',
  styleUrls: ['./Sla.component.css']
})
export class SlaComponent implements OnInit {
  public listadoSla: Sla[] = [];
  public listadoTempSla: Sla[] = [];
  public hoverShowed: boolean = true;
  public loading: boolean = false;
  public slaActual: Sla;
  public idUsuarioSesion: number;

  constructor(private administracionService: AdministracionService) { }

  ngOnInit() {
    this.getSlas();
    this.idUsuarioSesion = JSON.parse(localStorage.getItem('user'))?.usuarioId;
  }

  getSlas(){
    this.loading = true;
    this.administracionService.getSlas().subscribe( (res: Sla[]) => {
      this.listadoSla = res;
      this.loading = false;
      this.listadoTempSla = this.listadoSla;
    });
  }

  buscar( termino: string){
    let arrayToReturn: any[] = [];
    termino = termino.toLowerCase();
    this.loading = true;
    for ( let i = 0; i < this.listadoTempSla.length; i++) {
      let sla = this.listadoTempSla[i];
      let nombre = sla.descripcion.toLowerCase();
      if (nombre.indexOf(termino) >= 0) {
        arrayToReturn.push(sla);
      }
    }
    this.listadoSla = arrayToReturn;
    this.loading = false;
    if(this.listadoSla.length == 0){
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

  refrescarSlas(){
    this.getSlas();
  }

  abrirModalCrear(){
    $('#modalCreateSla').modal('show');
  }

  abrirModalEditar(sla: Sla){
    this.slaActual = sla;
    $('#modalEditSla').modal('show');
  }

  eliminarSla(id: number, idUsuarioElimina: number){
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
        this.administracionService.deleteSla(id,idUsuarioElimina).subscribe( res => {
          swalWithBootstrapButtons.fire(
            'Eliminado',
            'El registro ha sido eliminado',
            'success'
          );
        this.refrescarSlas();
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
