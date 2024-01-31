import { Component } from '@angular/core';
import { PeticionajaxService } from '../peticionajax.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  private route: ActivatedRoute;
  user: any;
  password:any;
  email:any;
  constructor(public ajax: PeticionajaxService, route: ActivatedRoute) {
    this.route = route;
  }

  ngOnInit(): void {
    console.log("cabecera");
  }

  sesionGoogle() {
    this.ajax.iniciarsesion();
  }

  sesionreg(email: string, password: string) {
    this.ajax.registroEmailYPassword(email, password);
  }

  sesionin(email: string, password: string) {
    this.ajax.iniciarSesion(email, password);
  }
}