import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { CuentaUsuario } from '../models/CuentaUsuario.model';
import { CuentaService } from '../services/cuenta.service';
import { ciudades, environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  currentUser$: Observable<CuentaUsuario>;
  registro: boolean = false;
  forgot_password: boolean = false;
  ciudades: any = ciudades;

  constructor(private cuentaService: CuentaService, private router: Router) { }

  ngOnInit() {
    this.model.identificationType = 0;
    this.model.city = "Distrito Nacional";
    this.registro = false;
    this.forgot_password = false;
    this.currentUser$ = this.cuentaService.currentUser$;
    
  }

  login(form: NgForm){
    if(form.valid){
      this.cuentaService.login(this.model).subscribe( res => {
        form.resetForm();
        this.router.navigateByUrl('/');
      }, error => {
        Swal.fire({
          icon: 'error',
          title: error.error.message
        });
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: "¡Favor completar todos los campos!"
      });
    }
  }

  registrar(form: NgForm){
    if(form.valid){
      this.model.roleid = "B6C977E9-09DA-4454-94B1-58C22A7DA7AB";
      this.cuentaService.register(this.model).subscribe( res => {
        Swal.fire({
          icon: 'success',
          title: "¡Usuario registrado!"
        });
        form.resetForm();
        this.registro = false;
      }, error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: error.error.message
        });
      }); 
    } else {
      if ((form.controls.email.status == 'INVALID' || form.controls.phone.status == 'INVALID') && (form.controls.email.dirty || form.controls.phone.dirty) ) {
        if(form.controls.email.status == 'INVALID') {
          Swal.fire({
            icon: 'error',
            title: "¡Campo email incorrecto!"
          });
        }
  
        if(form.controls.phone.status == 'INVALID') {
          Swal.fire({
            icon: 'error',
            title: "¡Campo teléfono incorrecto!"
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: "¡Favor completar todos los campos!"
        });
      }
    }

  }

  changePassword(form: NgForm){
    this.cuentaService.createPasswordChange(this.model).subscribe(res => {
      this.model.id = res['id'];
      this.cuentaService.changePassword({id: this.model.id, password: this.model.password, passwordConfirmation: this.model.passwordConfirmation}).subscribe( res => {
        Swal.fire({
          icon: 'success',
          title: "¡Cambio de contraseña exitosa!"
        });
        form.resetForm();
        this.forgot_password = false;
      }, error => {
        Swal.fire({
          icon: 'error',
          title: error.error.message
        });
      });
    })
  }

  logout(){
    this.cuentaService.logout();
    this.router.navigateByUrl('/');
  }
  
}
