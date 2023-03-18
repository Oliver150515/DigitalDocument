import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Departamento } from 'src/app/models/Departamento.model';
import { AdministracionService } from 'src/app/services/administracion.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-agregar-puesto',
  templateUrl: './agregar-puesto.component.html',
  styleUrls: ['./agregar-puesto.component.css']
})
export class AgregarPuestoComponent implements OnInit {
  model: any = {};
  @Input() listadoDepartamentosActivos: Departamento[] = [];
  @Output() newItemEvent = new EventEmitter<string>();

  constructor(private admintracionService: AdministracionService) { }

  ngOnInit() {
  }

  refrescarPuestos() {
    this.newItemEvent.emit();
  }

  agregarPuesto(form: NgForm){
    if(form.valid){
        this.model.borrado = false;
        this.model.creadoPor = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.model.modificadoPor = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.admintracionService.createPuesto(this.model).subscribe( res => {
            Swal.fire({
              icon: 'success',
              title: 'Puesto creado satisfactoriamente'
            });
            this.cerrarModal(form);
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
  
  cerrarModal(form: NgForm){
    form.resetForm();
    $('#modalCreatePuesto').modal('hide');
  }

}
