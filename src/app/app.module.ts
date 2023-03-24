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

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

import { PdfViewerModule } from 'ng2-pdf-viewer';

import { LegalizacionesComponent } from './components/legalizaciones/legalizaciones.component';
import { DocumentosComponent } from './components/documentos/documentos.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MetodoPagoComponent } from './components/metodo-pago/metodo-pago.component';
import { InformacionPersonalComponent } from './components/informacion-personal/informacion-personal.component';
import { EditarPerfilComponent } from './components/perfil/editar-perfil/editar-perfil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
    EditarPerfilComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatExpansionModule,
    MatTableModule,
    PdfViewerModule,
    MatButtonModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
