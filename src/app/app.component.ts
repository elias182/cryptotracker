import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DetalleComponent } from './detalle/detalle.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, CabeceraComponent, WelcomeComponent, DetalleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  ngOnInit(): void {
    console.log("dani atiende")
  }
  
  title = 'algo';
  nombreusuario="eldysil"
  urlimagen="https://www.fotillo.com/wp-content/uploads/2022/05/logo.png";
  infotit="";
  /**
   * hola
   */
  public hola() {
    this.title='pedro';
    console.log(this.title);
  }

  public personalizatit() {
    this.title=this.infotit;
    console.log(this.title);
  }
  trataevent(dato:any){
    console.log("entra : "+dato);
  }
}
