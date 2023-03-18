import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdministracionService } from 'src/app/services/administracion.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-agregar-sla',
  templateUrl: './agregar-sla.component.html',
  styleUrls: ['./agregar-sla.component.css']
})
export class AgregarSlaComponent implements OnInit {
  model: any = {};
  @Output() newItemEvent = new EventEmitter<string>();
  
  constructor(private admintracionService: AdministracionService) { }


  ngOnInit() {
  }

  refrescarSlas() {
    this.newItemEvent.emit();
  }

  agregarSla(form: NgForm){
    if(form.valid){
        this.model.borrado = false;
        this.model.creadoPor = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.model.modificadoPor = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.admintracionService.createSla(this.model).subscribe( res => {
            Swal.fire({
              icon: 'success',
              title: 'Sla creado satisfactoriamente'
            });
            this.cerrarModal(form);
            this.refrescarSlas();
        }, error => {
          Swal.fire({
            icon: 'error',
            title: error.error
          });
        });

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Favor de llenar los campos solicitados'
      });
    }
  }

  getValorEstatus(){
    return [
    {
      value: '0',
      descripcion: 'Activo'
    },
    {
      value: '1',
      descripcion: 'Inactivo'
    }, ]
  }
  
  cerrarModal(form: NgForm){
    form.resetForm();
    $('#modalCreateSla').modal('hide');
  }

}
