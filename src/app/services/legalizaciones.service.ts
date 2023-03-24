import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LegalizacionesService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUserById(id: string){
    return this.http.get(this.baseUrl + 'User?userId=' + id);
  }

  getCareers(){
    return this.http.get(this.baseUrl + 'Careers');
  }

  getAcademicInstitution(){
    return this.http.get(this.baseUrl + 'AcademicInstitution');
  }

  getDocumentTypes(){
    return this.http.get(this.baseUrl + 'DocumentTypes');
  }

  legalizationRequest(model: any) {
    return this.http.post(this.baseUrl + 'LegalizationRequest', model);
  }

  legalizationPaid(id: string){
    return this.http.patch(this.baseUrl + 'LegalizationRequest/mark-as-paid?legalizationId=' + id, {});
  }

}

