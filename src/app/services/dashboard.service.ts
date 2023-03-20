import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  baseUrl = environment.apiUrlErick;

  constructor(private http: HttpClient) { }

  getDashboardData(){
    return this.http.get(this.baseUrl + 'LegalizationRequest/get-dashboard-data');
  }
}
