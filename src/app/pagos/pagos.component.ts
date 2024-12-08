import { Component } from '@angular/core';
import { LogicraftServiceService } from '../logicraft-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [FormsModule, CommonModule, DashboardComponent],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css'
})
export class PagosComponent {
  paymentMethod: string = ''; // Método de pago seleccionado
  paymentResponse: string = ''; // Respuesta del backend
  paymentData = {
    method: '',
    card_name: '',
    card_number: '',
    cvv: '',
    expiry_date: '',
    bank: '',
    user_id: 1, // ID de ejemplo, cambia según el usuario actual
  };
  oxxoReference: string = ''; 
  paymentId: number | null = null;

  constructor(private logicraftService: LogicraftServiceService) {}

  

  async processPayment() {
    try {
      const response = await this.logicraftService.processPayment(this.paymentData);
      this.paymentResponse = response.message;
  
      // Verifica si el backend devuelve un payment_id
      if (response.payment_id) {
        this.paymentId = response.payment_id;
        console.log('Payment ID asignado:', this.paymentId); // Verificar en la consola
      } else {
        console.error('No se devolvió un payment_id desde el backend.');
        this.paymentId = null; // O usa un valor por defecto como 0
      }
      if (this.paymentData.method === 'oxxo') {
        this.oxxoReference = response.reference;
      }
  
      // Establece el método de pago para futuras validaciones
      this.paymentMethod = this.paymentData.method;
      console.log('Método de pago:', this.paymentMethod); // Verificar en la consola
    } catch (error) {
      console.error('Error procesando el pago:', error);
      this.paymentResponse = 'Error procesando el pago.';
    }
  }
  

  async downloadFull() {
    if (this.paymentMethod !== 'tarjeta') {
      alert('El archivo completo solo se puede descargar si pagaste con tarjeta.');
      return;
    }
  
    if (!this.paymentId) {
      alert('No se encontró un pago válido para esta descarga.');
      return;
    }
  
    try {
      await this.logicraftService.downloadFull(this.paymentId);
      alert('Archivo completo descargado correctamente.');
    } catch (error) {
      console.error('Error al descargar archivo completo:', error);
      alert('No se pudo descargar el archivo completo. Verifica tu pago.');
    }
  }

  
  
  

}
