import { Component, OnInit } from '@angular/core';
import { LogicraftServiceService } from '../logicraft-service.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diagramas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './diagramas.component.html',
  styleUrl: './diagramas.component.css'
})
export class DiagramasComponent{
  


  constructor(private userService: LogicraftServiceService, private router: Router) {}

  

  logout() {
    this.userService.logout(); 
    this.router.navigate(['/login']);
  }

}
