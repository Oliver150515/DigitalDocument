import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Sla } from 'src/app/models/Sla.model';
import { AdministracionService } from 'src/app/services/administracion.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-editar-sla',
  templateUrl: './editar-sla.component.html',
  styleUrls: ['./editar-sla.component.css']
})
export class EditarSlaComponent implements OnInit {
  model: any = {};
  @Input() slaActual: Sla;
  @Output() newItemEvent = new EventEmitter<string>();

  constructor(private admintracionService: AdministracionService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.slaActual != undefined){
      this.model.slaId = this.slaActual.slaId;
      this.model.descripcion = this.slaActual.descripcion;
      this.model.cantidadHoras = this.slaActual.cantidadHoras;
      this.model.estatus = this.slaActual.estatus;
    }
  }

  refrescarSlas() {
    this.newItemEvent.emit();
  }

  modificarSla(form: NgForm){
    if(form.valid){
        this.model.slaId = this.slaActual.slaId;
        this.model.borrado = this.slaActual.borrado;
        this.model.creadoPor = this.slaActual.creadoPor;
        this.model.fechaRegistro = this.slaActual.fechaRegistro;
        this.model.modificadoPor = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.admintracionService.editSla(this.model).subscribe( res => {
          Swal.fire({
            icon: 'success',
            title: 'Sla modificado satisfactoriamente'
          });
          form.resetForm();
          this.cerrarModal();
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

  cerrarModal(){
    $('#modalEditSla').modal('hide');
  }

}
