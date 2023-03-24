import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LegalizacionesComponent } from './components/legalizaciones/legalizaciones.component';
import { HomeComponent } from './home/home.component';

import { DocumentosComponent } from './components/documentos/documentos.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MetodoPagoComponent } from './components/metodo-pago/metodo-pago.component';
import { EditarPerfilComponent } from './components/perfil/editar-perfil/editar-perfil.component';
const routes: Routes = [
  {path: '', component: HomeComponent  },
  { path: '', 
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'solicitudes/legalizacion', component:LegalizacionesComponent},
      {path: 'consultas/consulta-legalizacion', component:DocumentosComponent},
      {path: 'configuracion/perfil', component:PerfilComponent},
      {path: 'configuracion/perfil/cambiar-contrasena', component:EditarPerfilComponent},
      {path: 'solicitudes/pago-legalizacion/:id', component:MetodoPagoComponent},
    ]
  },
  
  {path: '**', component: HomeComponent, pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
