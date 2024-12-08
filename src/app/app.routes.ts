import { Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GusuariosComponent } from './gusuarios/gusuarios.component';
import { GanunciosComponent } from './ganuncios/ganuncios.component';
import { TiendaComponent } from './tienda/tienda.component';
import { RegistroComponent } from './registro/registro.component';
import { PagosComponent } from './pagos/pagos.component';
import { GpagosComponent } from './gpagos/gpagos.component';
import { DiagramasComponent } from './diagramas/diagramas.component';
import { ApisComponent } from './apis/apis.component';
import { GraficasComponent } from './graficas/graficas.component';

export const routes: Routes = [
    { path: 'login', component: InicioSesionComponent },
    { path: 'register', component: RegistroComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'manage-users', component: GusuariosComponent },
    { path: 'gestion-pagos', component: GpagosComponent },
    { path: 'manage-ads', component: GanunciosComponent },
    { path: 'store', component: TiendaComponent },
    { path: 'payments', component: PagosComponent },
    { path: 'diagramas', component: DiagramasComponent },
    { path: 'apis', component: ApisComponent },
    { path: 'graficos', component: GraficasComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
