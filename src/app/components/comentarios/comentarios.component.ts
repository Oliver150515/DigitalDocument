import { Component, Input, OnInit } from '@angular/core';
import { Comentario } from 'src/app/models/Comentario.mode';
import { Usuario } from 'src/app/models/Usuario.model';
import { AdministracionService } from 'src/app/services/administracion.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  constructor(private admintracionService: AdministracionService) { }

  @Input() listadoComentarios: Comentario[] = [];
  public listadoUsuarios: Usuario[] = [];

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios(){
    this.admintracionService.getUsers().subscribe( (res: Usuario[]) => {
      this.listadoUsuarios = res;
    });
  }

  getNombreUsuarioById(id: any){
    if(id == null){
      return 'Sin Asignar';
    }else{
      return this.listadoUsuarios.find( x => x.usuarioId == id)?.nombreUsuario;
    }
  }

}
