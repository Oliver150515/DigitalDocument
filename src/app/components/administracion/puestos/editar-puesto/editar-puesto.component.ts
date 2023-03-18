import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Departamento } from 'src/app/models/Departamento.model';
import { Puesto } from 'src/app/models/Puesto.model';
import { AdministracionService } from 'src/app/services/administracion.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-editar-puesto',
  templateUrl: './editar-puesto.component.html',
  styleUrls: ['./editar-puesto.component.css']
})
export class EditarPuestoComponent implements OnInit {
  
  model: any = {};
  @Input() listadoDepartamentosActivos: Departamento[] = [];
  @Input() puestoActual: Puesto;
  @Output() newItemEvent = new EventEmitter<string>();
  public listadoDepartamento: Departamento[];

  constructor(private admintracionService: AdministracionService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.puestoActual != undefined){
      this.model.departamentoId = this.puestoActual.departamentoId;
      this.model.nombre = this.puestoActual.nombre;
      this.model.estatus = this.puestoActual.estatus;
    }

    if(this.listadoDepartamentosActivos != undefined){
      this.listadoDepartamento = this.listadoDepartamentosActivos;
    }
    
  }

  refrescarPuestos() {
    this.newItemEvent.emit();
  }

  modificarPuesto(form: NgForm){
    if(form.valid){
        this.model.puestoId = this.puestoActual.puestoId;
        this.model.borrado = this.puestoActual.borrado;
        this.model.creadoPor = this.puestoActual.creadoPor;
        this.model.fechaRegistro = this.puestoActual.fechaRegistro;
        this.model.modificadoPor = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.admintracionService.editPuesto(this.model).subscribe( res => {
          Swal.fire({
            icon: 'success',
            title: 'Puesto modificado satisfactoriamente'
          });
          form.resetForm();
          this.cerrarModal();
          this.refrescarPuestos();
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

  getDepartamentosActivos(){
    return this.listadoDepartamento.map(res => {
      var departamentos = {
        value: res.departamentoId,
        descripcion: res.nombre
      }
      return departamentos;
    });
  }
  
  cerrarModal(){
    $('#modalEditPuesto').modal('hide');
    
  }

}
