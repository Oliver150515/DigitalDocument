import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PerfilService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }
      getPerfil(model:any){
      
        return this.http.get( this.baseUrl+'/User?userId='+model);
      }
    editPerfil(model: any){
        return this.http.put( this.baseUrl+'/User', model);
      }
resetPass(id:any,model:any){
  return this.http.put( this.baseUrl+'/User/update-password?userId='+id, model);

}
  
}