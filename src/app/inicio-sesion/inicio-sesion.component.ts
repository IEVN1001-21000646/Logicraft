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
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink ],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {
  email = '';
  password = '';

  constructor(private authService: LogicraftServiceService, private router: Router) {}

  async login() {
    try {
      const response = await this.authService.login(this.email, this.password);
      if (response.user.role === 'admin') {
        this.router.navigate(['/manage-users']);
      } else {
        this.router.navigate(['/store']);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Credenciales incorrectas');
    }
  }

}
