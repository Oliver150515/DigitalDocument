import { Component, OnInit } from '@angular/core';
import { Documento } from 'src/app/models/Documento.model';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {
  public listDocumentos: Documento[] = [];
  public listTempDocumento: Documento[] = [];

  public hoverShowed: boolean = true;
  public loading: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  getDocumentos(){
    this.loading = true;
    // obtener desde metodo de la api 
    this.loading = false;
  }

  buscar(termino: string){
    console.log('Buscando');
    let arrayToReturn: any[] = [];
    termino = termino.toLowerCase();
    this.loading = true;
    for ( let i = 0; i < this.listTempDocumento.length; i++) {
      let documento = this.listTempDocumento[i];
      let nombre = documento.tipoDocumento.toLowerCase();
      if (nombre.indexOf(termino) >= 0) {
        arrayToReturn.push(documento);
      }
    }
    this.listDocumentos = arrayToReturn;
    this.loading = false;
    if(this.listDocumentos.length == 0){
      this.hoverShowed = false;
    } else{
      this.hoverShowed = true;
    }
  }
}
