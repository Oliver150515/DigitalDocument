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
import { LegalizacionesComponent } from './components/legalizaciones/legalizaciones.component';
import { DocumentosComponent } from './components/documentos/documentos.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MetodoPagoComponent } from './components/metodo-pago/metodo-pago.component';
import { InformacionPersonalComponent } from './components/informacion-personal/informacion-personal.component';

@NgModule({
  declarations: [				
    AppComponent,
    NavComponent,
    HomeComponent,
    LegalizacionesComponent,
    DocumentosComponent,
    PerfilComponent,
    MetodoPagoComponent,
    InformacionPersonalComponent,
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
