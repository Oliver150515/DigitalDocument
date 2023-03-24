import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ComboBox } from 'src/app/models/ComboBox.model';
import { CuentaUsuario } from 'src/app/models/CuentaUsuario.model';
import { CuentaService } from 'src/app/services/cuenta.service';
import { LegalizacionesService } from 'src/app/services/legalizaciones.service';

@Component({
  selector: 'app-legalizaciones',
  templateUrl: './legalizaciones.component.html',
  styleUrls: ['./legalizaciones.component.css']
})
export class LegalizacionesComponent implements OnInit {
  model: any = {};
  userModel: any = {};
  currentUser$: Observable<CuentaUsuario>;
  id=JSON.parse(localStorage.getItem('user'))?.id.toString();
  careersList: ComboBox[] = [];
  academicInstitutionList: ComboBox[] = [];
  documentTypesList: ComboBox[] = [];
  isFileChosen:boolean = false;
  fileName: string = '';

  constructor(private legalizacionService: LegalizacionesService, private cuentaService: CuentaService) { }

  ngOnInit(): void {
    this.model.identificationType = 0;
    this.fillData();
  }

  solicitudLegalizacion(form: NgForm){
    this.model.userId = this.id;
    console.log(this.model);
  }


  preUpload(event){
    let file = event.target.files[0];
    if (event.target.files.length > 0){
    this.isFileChosen = true;
    }        
    this.fileName = file.name;
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
    this.model.base64Document = reader.result.slice(29, reader.result.toString().length).toString();
    };
}

  fillData(){
    this.legalizacionService.getUserById(this.id).subscribe( res => {
      this.userModel = res;
    });

    this.legalizacionService.getCareers().subscribe( (res: []) => {
      this.careersList = res;
    });

    this.legalizacionService.getAcademicInstitution().subscribe( (res: []) => {
      this.academicInstitutionList = res;
    });

    this.legalizacionService.getDocumentTypes().subscribe( (res: []) => {
      this.documentTypesList = res;
    });

  }

  setCosto(){
    if(this.model.academicInstitutionId == "70b319fe-54c9-43b1-9aeb-8b510e00f0c7"){
      this.model.amount = 100;
    } else {
      this.model.amount = 200;
    }
  }

}
