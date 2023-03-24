import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  baseUrl = environment.apiUrlErick;


  constructor(private http: HttpClient) { }

  getAllLegalizationByUser(userId: string){
    return this.http.get( this.baseUrl + 'LegalizationRequest/get-all-by-user?userId=' + userId);
  }

  getById(documentId: string){
    return this.http.get( this.baseUrl + 'LegalizationRequest/get-by-id?id='+ documentId);
  }
}
