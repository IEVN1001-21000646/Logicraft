import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GanunciosComponent } from "./ganuncios/ganuncios.component";
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { GusuariosComponent } from "./gusuarios/gusuarios.component";
import { TiendaComponent } from "./tienda/tienda.component";
import { RegistroComponent } from './registro/registro.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GanunciosComponent, InicioSesionComponent, DashboardComponent, GusuariosComponent, TiendaComponent, RegistroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Logicraft';
}
