import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PerfilService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    editPerfil(model: any){
        return this.http.put( 'https://localhost:7134/User', model);
      }


}