import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartamentosComponent } from './components/administracion/departamentos/departamentos.component';
import { PrioridadComponent } from './components/administracion/prioridad/prioridad.component';
import { PuestosComponent } from './components/administracion/puestos/puestos.component';
import { SlaComponent } from './components/administracion/Sla/Sla.component';
import { UsuariosComponent } from './components/administracion/usuarios/usuarios.component';
import { AsignarIncidenteComponent } from './components/incidentes/asignar-incidente/asignar-incidente.component';
import { CerrarIncidentesComponent } from './components/incidentes/cerrar-incidentes/cerrar-incidentes.component';
import { ComentarIncidenteComponent } from './components/incidentes/comentar-incidente/comentar-incidente.component';
import { HistorialSolicitudesComponent } from './components/incidentes/historial-solicitudes/historial-solicitudes.component';
import { SolicitudIncidenteComponent } from './components/incidentes/solicitud-incidente/solicitud-incidente.component';
import { VerMisIncidentesComponent } from './components/incidentes/ver-mis-incidentes/ver-mis-incidentes.component';
import { VerTodosIncidentesComponent } from './components/incidentes/ver-todos-incidentes/ver-todos-incidentes.component';
import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent  },
  { path: '', 
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'administracion/departamentos', component: DepartamentosComponent },
      {path: 'administracion/prioridad', component: PrioridadComponent  },
      {path: 'administracion/puestos', component: PuestosComponent  },
      {path: 'administracion/sla', component: SlaComponent  },
      {path: 'administracion/usuarios', component: UsuariosComponent  },
      {path: 'incidentes/solicitudIncidente', component: SolicitudIncidenteComponent  },
      {path: 'incidentes/asignarIncidente', component: AsignarIncidenteComponent  },
      {path: 'incidentes/cerrarIncidente', component: CerrarIncidentesComponent  },
      {path: 'incidentes/historialSolicitudes', component: HistorialSolicitudesComponent  },
      {path: 'incidentes/verMisIncidentes', component: VerMisIncidentesComponent  },
      {path: 'incidentes/verTodosIncidentes', component: VerTodosIncidentesComponent  },
      {path: 'incidentes/comentarIncidente', component: ComentarIncidenteComponent  }
    ]
  },
  
  {path: '**', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
