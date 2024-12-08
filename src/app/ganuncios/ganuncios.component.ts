import { Component, OnInit } from '@angular/core';
import { LogicraftServiceService } from '../logicraft-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router'; 



@Component({
  selector: 'app-ganuncios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ganuncios.component.html',
  styleUrl: './ganuncios.component.css'
})
export class GanunciosComponent implements OnInit{
  ads: any[] = [];
  adName = '';
  adDuration = 0;
  selectedAd: any = null; 

  constructor(private adsService: LogicraftServiceService, private router: Router) {}

  async ngOnInit() {
    this.ads = await this.adsService.getAds();
  }

  async addAd() {
    try {
      const newAd = await this.adsService.addAd({ name: this.adName, duration: this.adDuration });
      this.ads.push(newAd);
      this.adName = '';
      this.adDuration = 0;
      alert('Anuncio agregado correctamente.');
    } catch (error) {
      console.error('Error al agregar anuncio:', error);
    }
  }

  async loadAds() {
    try {
      this.ads = await this.adsService.getAds();
    } catch (error) {
      console.error('Error al cargar anuncios:', error);
      alert('No se pudieron cargar los anuncios.');
    }
  }

  async deleteAd(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este anuncio?')) {
      try {
        await this.adsService.deleteAd(id);
        this.ads = this.ads.filter(ad => ad.id !== id); 
        alert(`Anuncio con ID ${id} eliminado correctamente.`);
      } catch (error) {
        console.error('Error al eliminar anuncio:', error);
        alert('No se pudo eliminar el anuncio.');
      }
    }
  }

  editAd(ad: any) {
    this.selectedAd = { ...ad }; 
  }

  async updateAd() {
    try {
      if (!this.selectedAd) return;
      await this.adsService.updateAd(this.selectedAd.id, this.selectedAd);
      alert(`Anuncio con ID ${this.selectedAd.id} actualizado correctamente.`);
      this.selectedAd = null; 
      await this.loadAds(); 
    } catch (error) {
      console.error('Error al actualizar anuncio:', error);
      alert('No se pudo actualizar el anuncio.');
    }
  }

  cancelEdit() {
    this.selectedAd = null; 
  }

  logout() {
    this.adsService.logout(); 
    this.router.navigate(['/login']); 
  }

}
