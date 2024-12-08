import { Component, OnInit } from '@angular/core';
import { LogicraftServiceService } from '../logicraft-service.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalDownloads: number = 0;
  totalAds: number = 0;
  totalAdTime: number = 0;
  

  constructor(private dashboardService: LogicraftServiceService, private router: Router) {}
  

  async ngOnInit() {
    try {
      const stats = await this.dashboardService.getStatistics();
      this.totalDownloads = stats.total_downloads;
      this.totalAds = stats.total_ads;
      this.totalAdTime = stats.total_ad_time;
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
      alert('No se pudieron cargar las estadísticas.');
    }
  }

  logout() {
    this.dashboardService.logout(); 
    this.router.navigate(['/login']); 
  }

}
