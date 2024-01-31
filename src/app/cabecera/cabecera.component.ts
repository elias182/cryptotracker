import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { PeticionajaxService } from '../peticionajax.service';
import { ActivatedRoute } from '@angular/router';
import { getAuth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [RouterModule, NgbAlertModule, CommonModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent implements OnInit {
  private route: ActivatedRoute;
  user:any="";
  usern:any="";
  auth:any;
  constructor(public ajax: PeticionajaxService, route: ActivatedRoute) {
    this.route = route;
  }

  ngOnInit(): void {
    console.log("cabecera");
    this.verificarSesion();
  }
  sesionGoogle(){
    this.ajax.iniciarsesion();
  }
  async verificarSesion() {
    this.auth = await this.ajax.estaUsuarioIniciadoSesion();
    console.log(this.auth)
    if (this.auth) {
      // Llamar a la función Usuario() después de verificar la sesión
      await this.ajax.Usuario();

      // Obtener el nombre del usuario desde la información almacenada
      this.usern = this.ajax.usuario?.displayName||'';
      this.user = this.ajax.usuario?.photoURL||'';
      console.log(this.user)
    }
  }
  cerrarses(){
    this.ajax.cerrarsesion();
  }
}
