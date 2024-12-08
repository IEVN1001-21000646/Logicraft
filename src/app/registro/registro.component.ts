import { Component } from '@angular/core';
import { LogicraftServiceService } from '../logicraft-service.service';
import { Router } from '@angular/router';
import { CommonModule,} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private appService: LogicraftServiceService) {}

  async register() {
    if (!this.name || !this.email || !this.password) {
      alert('Por favor, llena todos los campos.');
      return;
    }

    try {
      const response = await this.appService.register(this.name, this.email, this.password);
      alert('Usuario registrado con éxito');
      this.clearForm(); 
    } catch (error) {
      console.error(error);
      alert('Error al registrar el usuario');
    }
  }

  clearForm() {
    this.name = '';
    this.email = '';
    this.password = '';
  }

}
