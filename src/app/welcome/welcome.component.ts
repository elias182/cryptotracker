import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { PeticionajaxService } from '../peticionajax.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  @Output() lanzadaPeticionEvent = new EventEmitter<string>();
  constructor(public ajax: PeticionajaxService, private router:Router, public trend: PeticionajaxService, public FS: PeticionajaxService){
    this.peti();
  }
  
  searchKeyword: string = '';
  coins:any[]=[];
  auth:any;

  peti(){
    
    this.FS.obtenerFirest();
    this.ajax.peticionajax();
    this.trend.peticiontrend();
    console.log(this.trend.datosapi);
    this.lanzadaPeticionEvent.emit("peticion en curso");
  }
  searchCoins(keyword: string) {
    // Verifica si this.ajax.datosapi es un array antes de aplicar filter
    if (Array.isArray(this.ajax.datosapi)) {
      // Filtra las monedas que coinciden con la palabra clave
      this.coins = this.ajax.datosapi.filter(coin =>
        coin.name.toLowerCase().includes(keyword.toLowerCase())
      );
    } else {
      // Maneja el caso en el que this.ajax.datosapi no es un array
      console.error('this.ajax.datosapi no es un array');
      // Puedes asignar un valor predeterminado a this.coins o hacer algo más según tus necesidades
      this.coins = [];
    }
  }

  muestradetail(id: any) {
    // Realizar el enrutamiento a la ruta de detalle con el ID proporcionado
    this.router.navigate(['detalle/', id]);
  }

  async verificarSesion() {
    this.auth = await this.ajax.estaUsuarioIniciadoSesion();
    console.log(this.auth)
    
  }
  

  

  // new()
  // {
  //   this.items.push(this.content);
  //   console.log(this.items);
  // }

}
