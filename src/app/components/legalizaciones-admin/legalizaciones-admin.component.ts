import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Legalization } from 'src/app/models/Legalization.model';
import { DocumentoService } from 'src/app/services/documento.service';
import { LegalizacionesService } from 'src/app/services/legalizaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-legalizaciones-admin',
  templateUrl: './legalizaciones-admin.component.html',
  styleUrls: ['./legalizaciones-admin.component.css']
})
export class LegalizacionesAdminComponent implements OnInit {
  displayedColumns: string[] = ['tipoDocumento', 'institucion', 'carrera', 'fecha'];
  displayedColumnsRejected: string[] = ['tipoDocumento', 'institucion', 'carrera', 'fecha', 'comentario'];
  clickedRows = new Set<Legalization>();
  userModel: any = {};
  model: any = {};
  id=JSON.parse(localStorage.getItem('user'))?.id.toString();
  idlegalizacion = "";
  status = "";

  public listLegalizationsPending: Legalization[] = [];
  public listTempLegalizationsPending: Legalization[] = [];
  
  public selectLegalization: Legalization;

  public hoverShowed: boolean = true;
  public loading: boolean = false;
  public loadingDocument: boolean = false;

  public pdfSrc: string;
  public base64: string;
  constructor(private documentoSrv: DocumentoService, private legalizationService: LegalizacionesService) { }

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
    this.documentoSrv.getAllLegalizationById(1)
      .subscribe((res: Legalization[]) => {
        console.log(res);
        this.listLegalizationsPending = res.filter(e => e.status === 1);
        this.listTempLegalizationsPending = this.listLegalizationsPending;;
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

  descargarPDF(){
    const source = `data:application/pdf;base64,${this.base64}`;
    const link = document.createElement('a');
    console.log('descargando pdf');
    link.href = source;
    link.download = 'fileName.pdf';
    link.click();
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
      .subscribe( (res: any) => {
        console.log(res);
        this.userModel = res.user;
        this.base64 = res.base64String;
        this.model = res;
        
        let byteArry = new Uint8Array(
          atob(this.base64).split('').map((char) => char.charCodeAt(0))
        );
        const file = new Blob([byteArry], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        this.pdfSrc = fileURL;
      });
  }

  aprobar(){
    this.legalizationService.legalizationAprobado(this.model.id).subscribe( res => {
      Swal.fire({
        icon: 'success',
        title: "Aprobado realizado correctamente!"
      });
      this.getDocumentos();
    }, error => {
      Swal.fire({
        icon: 'error',
        title: error.error.message
      });
    });
  }

  rechazar(comentario: string){
    this.legalizationService.legalizationrechazada(this.model.id, this.model.comentario).subscribe( res => {
      Swal.fire({
        icon: 'success',
        title: "Rechazado realizado correctamente!"
      });
      this.getDocumentos();
      this.model.comentario = "";
    }, error => {
      Swal.fire({
        icon: 'error',
        title: error.error.message
      });
    });
  }



}
