import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CuentaUsuario } from './models/CuentaUsuario.model';
import { CuentaService } from './services/cuenta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'incidentes-front';
  users: any;
  
  constructor(private http: HttpClient, private cuentaService: CuentaService){}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user: CuentaUsuario = JSON.parse(localStorage.getItem('user'));
    this.cuentaService.setCurrentUser(user);
  }

}

