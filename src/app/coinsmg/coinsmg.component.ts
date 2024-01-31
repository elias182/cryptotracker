import { Component, Input, inject } from '@angular/core';
import { PeticionajaxService } from '../peticionajax.service';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { deleteDoc } from '@angular/fire/firestore';
import { doc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-coinsmg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coinsmg.component.html',
  styleUrl: './coinsmg.component.css'
})
export class CoinsmgComponent implements OnInit {

  info:any[]=[];
  db=inject(Firestore);
  constructor(public ajax: PeticionajaxService, route: ActivatedRoute) {
    
  }

  async ngOnInit() {
    
    await this.ajax.obtenerDocumentosPorUidUsuarioActual();
    this.info = this.ajax.datosFS;
    this.prb();
  }

  prb(){
    console.log(this.info)
  }
  async borrarMoneda(coinid: string) {
    // Borrar el documento de Firestore directamente sin preguntar al usuario
    this.ajax.eliminarMonedaFirestore(coinid);

    // Vuelve a cargar la lista después de borrar
    await this.ajax.obtenerDocumentosPorUidUsuarioActual();
    this.info = this.ajax.datosFS;
  }
}
