import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LogicraftServiceService } from '../logicraft-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as L from 'leaflet' 
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apis',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './apis.component.html',
  styleUrl: './apis.component.css'
})
export class ApisComponent implements OnInit{

  apis: any[] = [];
  showForm: boolean = false;
  editMode: boolean = false;
  selectedApi: any = null;
  sanitizedMapUrl: SafeResourceUrl | null = null;

  newApi = {
    name: '',
    location: ''
  };

  constructor(private apiService: LogicraftServiceService, private sanitizer: DomSanitizer, private router: Router) {}

  ngOnInit() {
    this.loadApis();
  }

  async loadApis() {
    this.apis = await this.apiService.getApis();
  }

  addApi() {
    this.showForm = true; // Muestra el formulario
    this.editMode = false; // Asegúrate de que no esté en modo de edición
    this.newApi = { name: '', location: '' }; // Limpia los datos del formulario
    this.selectedApi = null; // Limpia cualquier selección previa
  }
  

  async registerApi() {
    if (this.editMode) {
      // Actualiza la API seleccionada
      await this.apiService.updateApi(this.selectedApi.id, this.newApi);
    } else {
      // Registra una nueva API
      await this.apiService.registerApi(this.newApi);
    }
    this.cancelForm(); // Limpia el formulario y oculta
    this.loadApis(); // Recarga la lista de APIs
  }

  editApi(api: any) {
    this.showForm = true;
    this.editMode = true;
    this.newApi = { name: api.name, location: api.location };
    this.selectedApi = api;
  }

  cancelForm() {
    this.showForm = false;
    this.editMode = false;
    this.newApi = { name: '', location: '' };
    this.selectedApi = null;
  }

  async deleteApi(id: number) {
    if (confirm('¿Estás seguro de eliminar esta API?')) {
      await this.apiService.deleteApi(id);
      this.loadApis();
    }
  }

  selectApi(api: any) {
    this.selectedApi = api;
    const mapUrl = `https://www.google.com/maps?q=${api.location}&z=5&output=embed`;
    this.sanitizedMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
  }

  logout() {
    this.apiService.logout(); 
    this.router.navigate(['/login']); 
  }


}
