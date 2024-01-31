import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { PeticionajaxService } from '../peticionajax.service';
import { collection, addDoc, query, where, getDocs, doc, deleteDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
declare var CanvasJS: any;

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit {

  @Input() id: string = "";
  private route: ActivatedRoute;
  uid:any="";
  db=inject(Firestore);
  
  auth:any;
  chart:any;
  cor:any;

  constructor(public ajax: PeticionajaxService, route: ActivatedRoute, private router: Router ) {
    this.route = route;

  }

  ngOnInit(): void {

    console.log(this.id);
    this.detalle();
    this.verificarSesion();

    this.cor=this.ajax.isCoinInCollection(this.ajax.detailapi.id)
  }

  detalle() {
    this.ajax.peticiondetail(this.id);
    this.ajax.peticiondetailg(this.id);
    this.construirGrafica();

  }
  async darmg() {
    if (this.auth) {
      const coinid = this.ajax.detailapi.id;
      const name = this.ajax.detailapi.name
      const image = this.ajax.detailapi.image.small

      if (await this.ajax.isCoinInCollection(coinid)) {
        // El elemento ya está en la colección, deschequear y eliminar
        await deleteDoc(doc(this.db, 'mgCrypto', coinid));
        console.log("borrao")
      } else {
        // El elemento no está en la colección, chequear y agregar
        await addDoc(collection(this.db, 'mgCrypto'), {
          coinid: coinid,
          uid: this.uid,
          name: name,
          fecha: new Date().toLocaleDateString('es-ES'),

          image: image
        });
        console.log("añadio")
      }
    } else {
      // Usuario no autenticado, redirigir a la página de inicio de sesión
      this.router.navigate(['/Inicio']);
    }
  }
  
  async verificarSesion() {
    this.auth = await this.ajax.estaUsuarioIniciadoSesion();
    console.log(this.auth)
    if (this.auth) {
      // Llamar a la función Usuario() después de verificar la sesión
      await this.ajax.Usuario();

      // Obtener el nombre del usuario desde la información almacenada
      this.uid = this.ajax.usuario?.uid||'';
      
    }
  }
  construirGrafica() {
    console.log("detalles de la grafica ");

    if (this.ajax.detailapig) {
      // Utilizar setTimeout para asegurar que el contenedor esté presente en el DOM
      setTimeout(() => {
        const chartContainer = document.getElementById('chartContainer');

        // Verificar si el contenedor existe antes de construir la gráfica
        if (chartContainer) {
          this.chart = new CanvasJS.Chart('chartContainer', {
            animationEnabled: true,
            theme: 'light2',
            title: {
              text: 'Precio de la Moneda en los últimos 30 días'
            },
            axisX: {
              title: 'Fecha',
              valueFormatString: 'DD MMM'
            },
            axisY: {
              title: 'Precio en EUR'
            },
            data: [{
              type: 'line',
              dataPoints: this.ajax.detailapig.map((price: any) => ({
                x: new Date(price[0]),
                y: price[1]
              }))
            }]
          });

          this.chart.render();
        }
      }, 100); // Esperar 100 milisegundos (puedes ajustar este valor según sea necesario)
    }
  }



}