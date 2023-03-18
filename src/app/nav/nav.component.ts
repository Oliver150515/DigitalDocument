import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { CuentaUsuario } from '../models/CuentaUsuario.model';
import { CuentaService } from '../services/cuenta.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  currentUser$: Observable<CuentaUsuario>;

  constructor(private cuentaService: CuentaService, private router: Router) { }

  ngOnInit() {
    this.currentUser$ = this.cuentaService.currentUser$;
  }

  login(form: NgForm){
    this.cuentaService.login(this.model).subscribe( response => {
      this.router.navigateByUrl('/');
      if(form.valid){
        form.resetForm();
      }
    }, error => {
      Swal.fire({
        icon: 'error',
        title: error.error
      });
    });
  }

  logout(){
    this.cuentaService.logout();
    this.router.navigateByUrl('/');
  }
  
}
