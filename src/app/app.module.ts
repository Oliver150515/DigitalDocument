import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { CommonModule } from '@angular/common';
import { DepartamentosComponent } from './components/administracion/departamentos/departamentos.component';
import { PrioridadComponent } from './components/administracion/prioridad/prioridad.component';
import { PuestosComponent } from './components/administracion/puestos/puestos.component';
import { SlaComponent } from './components/administracion/Sla/Sla.component';
import { UsuariosComponent } from './components/administracion/usuarios/usuarios.component';
import { AsignarIncidenteComponent } from './components/incidentes/asignar-incidente/asignar-incidente.component';
import { CerrarIncidentesComponent } from './components/incidentes/cerrar-incidentes/cerrar-incidentes.component';
import { HistorialSolicitudesComponent } from './components/incidentes/historial-solicitudes/historial-solicitudes.component';
import { SolicitudIncidenteComponent } from './components/incidentes/solicitud-incidente/solicitud-incidente.component';
import { VerMisIncidentesComponent } from './components/incidentes/ver-mis-incidentes/ver-mis-incidentes.component';
import { VerTodosIncidentesComponent } from './components/incidentes/ver-todos-incidentes/ver-todos-incidentes.component';
import { LoadingComponent } from './components/loading/loading.component';
import { AgregarUsuarioComponent } from './components/administracion/usuarios/agregar-usuario/agregar-usuario.component';
import { EditarDepartamentoComponent } from './components/administracion/departamentos/editar-departamento/editar-departamento.component';
import { AgregarDepartamentoComponent } from './components/administracion/departamentos/agregar-departamento/agregar-departamento.component';
import { EditarUsuarioComponent } from './components/administracion/usuarios/editar-usuario/editar-usuario.component';
import { EditarPuestoComponent } from './components/administracion/puestos/editar-puesto/editar-puesto.component';
import { AgregarPuestoComponent } from './components/administracion/puestos/agregar-puesto/agregar-puesto.component';
import { AgregarSlaComponent } from './components/administracion/Sla/agregar-sla/agregar-sla.component';
import { EditarSlaComponent } from './components/administracion/Sla/editar-sla/editar-sla.component';
import { AgregarPrioridadComponent } from './components/administracion/prioridad/agregar-prioridad/agregar-prioridad.component';
import { EditarPrioridadComponent } from './components/administracion/prioridad/editar-prioridad/editar-prioridad.component';
import { AgregarIncidenteComponent } from './components/incidentes/solicitud-incidente/agregar-incidente/agregar-incidente.component';
import { EditarIncidenteComponent } from './components/incidentes/solicitud-incidente/editar-incidente/editar-incidente.component';
import { ComentarIncidenteComponent } from './components/incidentes/comentar-incidente/comentar-incidente.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';

@NgModule({
  declarations: [				
    AppComponent,
    NavComponent,
    HomeComponent,
    DepartamentosComponent,
    PrioridadComponent,
    PuestosComponent,
    SlaComponent,
    UsuariosComponent,
    AsignarIncidenteComponent,
    CerrarIncidentesComponent,
    HistorialSolicitudesComponent,
    SolicitudIncidenteComponent,
    VerMisIncidentesComponent,
    VerTodosIncidentesComponent,
    LoadingComponent,
    AgregarUsuarioComponent,
    EditarUsuarioComponent,
    EditarDepartamentoComponent,
    AgregarDepartamentoComponent,
    EditarPuestoComponent,
    AgregarPuestoComponent,
    AgregarSlaComponent,
    EditarSlaComponent,
    AgregarPrioridadComponent,
    EditarPrioridadComponent,
    AgregarIncidenteComponent,
    EditarIncidenteComponent,
    ComentarIncidenteComponent,
    ComentariosComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
