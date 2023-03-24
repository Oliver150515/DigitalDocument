import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CuentaUsuario } from '../models/CuentaUsuario.model';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<CuentaUsuario>(1);
  currentUser$ = this.currentUserSource.asObservable();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'text/plain',

    })
  };
  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post(this.baseUrl + 'Account', model).pipe(
      map((response) => {
        const user = this.getDecodedAccessToken(JSON.stringify(response));
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'Register', model);
  }

  createPasswordChange(model: any){
    return this.http.post(this.baseUrl + 'Account/create-change-password', model);
  }

  changePassword(model: any){
    return this.http.post(this.baseUrl + 'Account/change-password', model);
  }

  setCurrentUser(user: CuentaUsuario){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

}
