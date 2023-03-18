import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CuentaUsuario } from '../models/CuentaUsuario.model';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<CuentaUsuario>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post(this.baseUrl + 'cuenta/login', model).pipe(
      map((response: CuentaUsuario) => {
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: CuentaUsuario){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

}
