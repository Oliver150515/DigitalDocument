import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LegalizacionesComponent } from './components/legalizaciones/legalizaciones.component';
import { HomeComponent } from './home/home.component';
import { BecasComponent } from './components/becas/becas.component';
import { DocumentosComponent } from './components/documentos/documentos.component';
import { InformacionPersonalComponent } from './components/informacion-personal/informacion-personal.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MetodoPagoComponent } from './components/metodo-pago/metodo-pago.component';

const routes: Routes = [
  {path: '', component: HomeComponent  },
  { path: '', 
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'legalizaciones/home', component:LegalizacionesComponent},
      {path: 'becas/home', component:BecasComponent},
      {path: 'documentos/home', component:DocumentosComponent},
      {path: 'informacion/home', component:InformacionPersonalComponent},
      {path: 'perfil/home', component:PerfilComponent},
      {path: 'metodoPago/home', component:MetodoPagoComponent},
    ]
  },
  
  {path: '**', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
