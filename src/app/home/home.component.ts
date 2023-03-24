import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../models/Dashboard.model';
import { DashboardService } from '../services/dashboard.service';
import Chart from 'chart.js/auto';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public dashboardTotal: Dashboard;
  public haveData: boolean = false;
  public chart: any;

  usuarioIdSesion = JSON.parse(localStorage.getItem('user'))?.usuarioId;


  constructor(private dashboardSrv: DashboardService) { }

  ngOnInit() {
    this.getDashboardData();
  }

  getDashboardData(){
    this.dashboardSrv.getDashboardData().subscribe( (res : Dashboard) => {
      this.dashboardTotal = res;
      console.log(res);

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
