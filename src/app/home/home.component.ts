import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../models/Dashboard.model';
import { DashboardService } from '../services/dashboard.service';
import Chart from 'chart.js/auto';
import { CuentaService } from '../services/cuenta.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public dashboardTotal: Dashboard;
  public haveData: boolean = false;
  public chart: any;
  currentUser: CuentaService;

  usuarioIdSesion = JSON.parse(localStorage.getItem('user'))?.id;
  userIsAdmin = JSON.parse(localStorage.getItem('user'))?.isadmin;

  constructor(private dashboardSrv: DashboardService, private cuentaService: CuentaService,private router: Router) { }

  ngOnInit() {
    this.getDashboardData();
    console.log(this.userIsAdmin);
    if(this.userIsAdmin == 'False') {
      this.router.navigateByUrl('/consultas/consulta-legalizacion');
    }
  }

  getDashboardData(){
    this.dashboardSrv.getDashboardData().subscribe( (res : Dashboard) => {
      this.dashboardTotal = res;

      const isEmpty = Object.values(res).every(x => x === null || x === '');

      if(!isEmpty){
        this.createChart(this.dashboardTotal);
        this.haveData = true;
      }
    });
  }

  createChart(dashboardTotal: Dashboard){

    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Legalizaciones Realizadas', 'Legalizaciones Pendientes','Legalizaciones Denegadas','Legalizaciones Aprobadas'],
	      datasets: [{
          data: [
            dashboardTotal.allLegalizationAmount,
            dashboardTotal.todayPendingLegalationsAmount,
            dashboardTotal.todayDenyLegalationsAmount,
            dashboardTotal.todayApprovedLegalationsAmount
          ],
          backgroundColor: [
            'blue',
            'yellow',
            'red',
			      'green',		
          ],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 1.1
      }
    });
  }
}
