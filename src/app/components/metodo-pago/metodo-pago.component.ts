import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LegalizacionesService } from 'src/app/services/legalizaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.component.html',
  styleUrls: ['./metodo-pago.component.css']
})
export class MetodoPagoComponent implements OnInit {
  
  public mensaje: boolean = false;
  public error: boolean = false;
  id: string;
  model: any = {};
  
  constructor(private legalizacionService: LegalizacionesService, private activedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.mensaje = false;
    this.error = false;
    this.id = this.activedRoute.snapshot.paramMap.get("id");
  }

  pagando(form: NgForm){
    console.log(form);
    if(form.valid){
      this.legalizacionService.legalizationPaid(this.id).subscribe( res => {
        Swal.fire({
          icon: 'success',
          title: "¡Pago realizado correctamente!"
        });
        this.mensaje = true;
        form.resetForm();
        this.router.navigateByUrl('/solicitudes/legalizacion/');
      }, error => {
        this.mensaje = true;
        this.error = true;
        Swal.fire({
          icon: 'error',
          title: error.error.message
        });
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: "¡Favor completar todos los campos!"
      });
    }

   
  }

}
