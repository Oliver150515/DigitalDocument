import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Departamento } from 'src/app/models/Departamento.model';
import { AdministracionService } from 'src/app/services/administracion.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-editar-departamento',
  templateUrl: './editar-departamento.component.html',
  styleUrls: ['./editar-departamento.component.css']
})
export class EditarDepartamentoComponent implements OnInit {
  model: any = {};
  @Input() departamentoActual: Departamento;
  @Output() newItemEvent = new EventEmitter<string>();

  constructor(private admintracionService: AdministracionService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.departamentoActual != undefined){
      this.model.departamentoId = this.departamentoActual.departamentoId;
      this.model.nombre = this.departamentoActual.nombre;
      this.model.estatus = this.departamentoActual.estatus;
    }
  }

  refrescarDepartamentos() {
    this.newItemEvent.emit();
  }

  modificarDepartamento(form: NgForm){
    if(form.valid){
        this.model.departamentoId = this.departamentoActual.departamentoId;
        this.model.borrado = this.departamentoActual.borrado;
        this.model.creadoPor = this.departamentoActual.creadoPor;
        this.model.fechaRegistro = this.departamentoActual.fechaRegistro;
        this.model.modificadoPor = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.admintracionService.editDepartamento(this.model).subscribe( res => {
          Swal.fire({
            icon: 'success',
            title: 'Departamento modificado satisfactoriamente'
          });
          form.resetForm();
          this.cerrarModal();
          this.refrescarDepartamentos();
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
    $('#modalEditDepartamento').modal('hide');
    
  }

}
