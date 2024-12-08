import { Component, OnInit } from '@angular/core';
import { LogicraftServiceService } from '../logicraft-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gpagos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gpagos.component.html',
  styleUrl: './gpagos.component.css'
})
export class GpagosComponent implements OnInit{

  payments: any[] = []; 
  totalSales: number = 0; 

  constructor(private paymentService: LogicraftServiceService, private router: Router) {}

  async ngOnInit() {
    await this.loadPayments();
  }

  async loadPayments() {
    try {
      this.payments = await this.paymentService.getPayments();
  
      this.totalSales = this.payments.reduce((sum, payment) => sum + Number(payment.amount), 0);
    } catch (error) {
      console.error('Error al cargar pagos:', error);
      alert('No se pudieron cargar los pagos.');
    }
  }

  async deletePayment(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este pago?')) {
      try {
        await this.paymentService.deletePayment(id);
        this.payments = this.payments.filter(payment => payment.id !== id); // Actualizar la lista
        this.totalSales = this.payments.reduce((sum, payment) => sum + payment.amount, 0); // Recalcular el total
        alert(`Pago con ID ${id} eliminado correctamente.`);
      } catch (error) {
        console.error('Error al eliminar pago:', error);
        alert('No se pudo eliminar el pago.');
      }
    }
  }


  logout() {
    this.paymentService.logout(); 
    this.router.navigate(['/login']); 
  }


}
