import { Component } from '@angular/core';
import { LogicraftServiceService } from '../logicraft-service.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent {
  constructor(private storeService: LogicraftServiceService, private router: Router) {}

  async downloadDemo() {
    try {
      await this.storeService.downloadDemo(); 
    } catch (error) {
      console.error('Error al descargar archivo:', error);
      alert('No se pudo descargar el archivo.');
    }
  }

  goToPayment() {
    window.location.href = '/payments'; 
  }

  logout() {
    this.storeService.logout(); 
    this.router.navigate(['/login']); 
  }

}
