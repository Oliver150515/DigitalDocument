import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Puesto } from 'src/app/models/Puesto.model';
import { Usuario } from 'src/app/models/Usuario.model';
import { AdministracionService } from 'src/app/services/administracion.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  model: any = {};
  @Input() listadoPuestosActivos: Puesto[] = [];
  @Input() usuarioActual: Usuario;
  @Output() newItemEvent = new EventEmitter<string>();
  public listadoPuesto: Puesto[];
  constructor(private admintracionService: AdministracionService) { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(this.usuarioActual != undefined){
      this.model.puestoId = this.usuarioActual.puestoId;
      this.model.nombre = this.usuarioActual.nombre;
      this.model.apellido = this.usuarioActual.apellido;
      this.model.cedula = this.usuarioActual.cedula;
      this.model.telefono = this.usuarioActual.telefono;
      this.model.correo = this.usuarioActual.correo;
      this.model.fechaNacimiento = this.usuarioActual.fechaNacimiento;
      this.model.nombreUsuario = this.usuarioActual.nombreUsuario;
      this.model.contrasena = this.usuarioActual.contrasena;
      this.model.estatus = this.usuarioActual.estatus;
    }

    if(this.listadoPuestosActivos != undefined){
      this.listadoPuesto = this.listadoPuestosActivos;
    }
    
  }

  refrescarUsuarios() {
    this.newItemEvent.emit();
  }

  modificarUsuario(form: NgForm){
    if(form.valid){
        this.model.usuarioId = this.usuarioActual.usuarioId;
        this.model.borrado = this.usuarioActual.borrado;
        this.model.creadoPor = this.usuarioActual.creadoPor;
        this.model.fechaRegistro = this.usuarioActual.fechaRegistro;
        this.model.modificadoPor = JSON.parse(localStorage.getItem('user'))?.usuarioId;
        this.admintracionService.editUser(this.model).subscribe( res => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario modificado satisfactoriamente'
          });
          form.resetForm();
          this.cerrarModal();
          this.refrescarUsuarios();
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

  getPuestos(){
    this.admintracionService.getPuestos().subscribe( res => {
      console.log(res);
    });
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

  getPuestosActivos(){
    return this.listadoPuesto.map(res => {
      var puestos = {
        value: res.puestoId,
        descripcion: res.nombre
      }
      return puestos;
    });
  }
  
  cerrarModal(){
    $('#modalEditUser').modal('hide');
    
  }

}
