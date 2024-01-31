import { Routes } from '@angular/router';
import { DetalleComponent } from './detalle/detalle.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { InicioComponent } from './inicio/inicio.component';
import { CoinsmgComponent } from './coinsmg/coinsmg.component';

export const routes: Routes = [
    { path: "", redirectTo: "cuerpo", pathMatch: "full" }, // Redirige "/" a "/cuerpo"
    {path: "detalle/:id", component: DetalleComponent},
    {path: "cuerpo", component: WelcomeComponent},
    {path: "Inicio", component: InicioComponent},
    {path: "mgcoins", component: CoinsmgComponent}
];
