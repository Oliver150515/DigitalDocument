import { Component, OnInit } from '@angular/core';
import { Legalization } from 'src/app/models/Legalization.model';
import { DocumentoService } from 'src/app/services/documento.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css'],
})


export class DocumentosComponent implements OnInit {
  displayedColumns: string[] = ['tipoDocumento', 'institucion', 'carrera', 'fecha'];
  displayedColumnsRejected: string[] = ['tipoDocumento', 'institucion', 'carrera', 'fecha', 'comentario'];
  clickedRows = new Set<Legalization>();
  
  public listLegalizationsPending: Legalization[] = [];
  public listTempLegalizationsPending: Legalization[] = [];
  
  public listLegalizationsApprove: Legalization[] = [];
  public listTempLegalizationsApprove: Legalization[] = [];
  
  public listLegalizationsRejected: Legalization[] = [];
  public listTempLegalizationsRejected: Legalization[] = [];
  
  public selectLegalization: Legalization;

  public hoverShowed: boolean = true;
  public loading: boolean = false;
  public loadingDocument: boolean = false;

  constructor(private documentoSrv: DocumentoService) { }

  ngOnInit(): void {
    this.getDocumentos();
  }

  getDocumentos(){
    /**
     * 0 : pendiente
     * 1 : aprobado
     * 2 : rechazado
     * 3 : Pagado
     */
    this.loading = true;

    // CAMBIAR Y PONER USER ID
    this.documentoSrv.getAllLegalizationByUser('294D57EE-2F2B-4953-9A93-959E22EDCF4D')
      .subscribe((res: Legalization[]) => {
        console.log(res);
        this.listLegalizationsPending = res.filter(e => e.status === 0);
        this.listTempLegalizationsPending = this.listLegalizationsPending;

        this.listLegalizationsApprove = res.filter(e => e.status === 3);
        this.listTempLegalizationsApprove = this.listLegalizationsApprove;
        
        this.listLegalizationsRejected = res.filter(e => e.status === 2);
        this.listTempLegalizationsRejected = this.listLegalizationsRejected;
      });

    setTimeout(()=>{
      this.loading = false;
    }, 1000);
  }

  mostrar(row){
    this.loadingDocument = false;
    this.clickedRows.clear();
    this.clickedRows.add(row);

    setTimeout(()=>{
      this.selectLegalization = row;
      this.getById(row.id);
      this.loadingDocument = true;
    }, 100);
  }

  changeTab(){
    if(this.loadingDocument == true){
      this.loadingDocument = false;
      this.clickedRows.clear();
    }
  }

  buscar(termino: string){
    let arrayToReturn: any[] = [];
    termino = termino.toLowerCase();
    this.loading = true;
    for ( let i = 0; i < this.listTempLegalizationsPending.length; i++) {
      let documento = this.listTempLegalizationsPending[i];
      let nombre = documento.documentType.name.toLowerCase();
      if (nombre.indexOf(termino) >= 0) {
        arrayToReturn.push(documento);
      }
    }
    this.listLegalizationsPending = arrayToReturn;
    this.loading = false;
    if(this.listLegalizationsPending.length == 0){
      this.hoverShowed = false;
    } else{
      this.hoverShowed = true;
    }
  }

  getById(documentId: string){
    this.documentoSrv.getById(documentId)
      .subscribe( (res) => {
        console.log(res);
      });
  }

}
