import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LogicraftServiceService } from '../logicraft-service.service'; 
import { Chart, PieController, Tooltip, ArcElement, Legend, BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-graficas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './graficas.component.html',
  styleUrl: './graficas.component.css'
})
export class GraficasComponent implements OnInit, AfterViewInit {

  
  paymentsData: any; // Para almacenar los datos de pagos

  chart?: any; // Referencia al gráfico de Chart.js
  userStatsData: any; // Para almacenar los datos de usuarios por tipo
  userChart?: any; 
  downloadStatsData: any; // Para almacenar los datos de descargas por tipo
  downloadChart?: any; // Referencia al gráfico de descargas

  constructor(private apiService: LogicraftServiceService, private router: Router) {
    // Registrar los componentes necesarios de Chart.js
    Chart.register(PieController, ArcElement, Tooltip, Legend, BarController, BarElement, CategoryScale, LinearScale);
  }

  ngOnInit(): void {
    this.getPaymentData();
    this.getDownloadStats();
    this.getUserStats();  // Obtener los datos de pagos al inicio
  }

  ngAfterViewInit(): void {
    // Crear el gráfico solo después de que el DOM esté completamente cargado
    this.createChart();
    this.createDownloadChart();
    this.createUserChart();
  }

  // Método para obtener los datos de pagos desde el backend
  getPaymentData() {
    this.apiService.getPaymentData().then(response => {
      this.paymentsData = response;
      this.createChart();  // Llamar a createChart después de recibir los datos
    }).catch(error => {
      console.error('Error al obtener los datos de pagos:', error);
    });
  }

  // Método para crear la gráfica
  createChart() {
    if (this.paymentsData) {
      const oxxoPayments = this.paymentsData.oxxo || 0;
      const cardPayments = this.paymentsData.card || 0;
  
      const totalPayments = oxxoPayments + cardPayments;
      const oxxoPercentage = (oxxoPayments / totalPayments) * 100;
      const cardPercentage = (cardPayments / totalPayments) * 100;
  
      // Si el gráfico ya existe, destruirlo antes de crear uno nuevo
      if (this.chart) {
        this.chart.destroy();
      }
  
      // Configuración del gráfico
      this.chart = new Chart('paymentChart', {
        type: 'pie',
        data: {
          labels: ['OXXO', 'Tarjeta'],
          datasets: [{
            label: 'Pagos por Método',
            data: [oxxoPercentage, cardPercentage],
            backgroundColor: ['#D3A9FD', '#D569B4'],
            hoverBackgroundColor: ['#36a2eb','#ff6384', ],
            borderWidth: 0,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#ffffff', // Cambia el color del texto en la leyenda
                font: {
                  size: 14, // Tamaño de fuente para la leyenda
                }
              }
            },
            tooltip: {
              backgroundColor: '#333333', // Cambia el color de fondo del tooltip
              titleColor: '#ffffff', // Cambia el color del título del tooltip
              bodyColor: '#ffffff', // Cambia el color del texto del cuerpo del tooltip
              bodyFont: {
                size: 14, // Ajusta el tamaño de la fuente en el tooltip
              },
              titleFont: {
                size: 14, // Ajusta el tamaño del título en el tooltip
              },
            }
          }
        }
      });
    }
  }
  

  getUserStats() {
    this.apiService.getUserStats().then(response => {
      this.userStatsData = response;
      this.createUserChart();  // Llamar a createUserChart después de recibir los datos
    }).catch(error => {
      console.error('Error al obtener los datos de usuarios:', error);
    });
  }

  createUserChart() {
    if (this.userStatsData) {
      const roles = Object.keys(this.userStatsData); // Nombres de los roles (admin, client, editor)
      const counts = Object.values(this.userStatsData); // Cantidad de usuarios por rol

      // Si el gráfico ya existe, destruirlo antes de crear uno nuevo
      if (this.userChart) {
        this.userChart.destroy();
      }

      // Configuración del gráfico
      this.userChart = new Chart('userChart', {
        type: 'bar',
        data: {
          labels: roles,
          datasets: [{
            label: 'Cantidad de Usuarios por Rol',
            data: counts,
            backgroundColor: ['#ff6384', '#36a2eb', '#e169f4'],
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          indexAxis: 'y', // Gráfico de barras horizontales
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#ffffff', // Cambia el color de la leyenda
              }
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return tooltipItem.label + ': ' + tooltipItem.raw;
                }
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                color: '#ffffff', // Cambia el color de los números en el eje x
              },
            },
            y: {
              ticks: {
                color: '#ffffff', // Cambia el color de las etiquetas en el eje y
              }
            }
          }
        }
      });
    }
  }

  getDownloadStats() {
    this.apiService.getDownloadStats().then(response => {
      this.downloadStatsData = response;
      this.createDownloadChart(); // Crear el gráfico después de recibir los datos
    }).catch(error => {
      console.error('Error al obtener los datos de descargas:', error);
    });
  }

  createDownloadChart() {
    if (this.downloadStatsData) {
      const downloadTypes = Object.keys(this.downloadStatsData); // Tipos de descargas (full, demo)
      const counts = Object.values(this.downloadStatsData); // Cantidad de cada tipo

      // Si el gráfico ya existe, destruirlo antes de crear uno nuevo
      if (this.downloadChart) {
        this.downloadChart.destroy();
      }

      // Configuración del gráfico
      this.downloadChart = new Chart('downloadChart', {
        type: 'bar',
        data: {
          labels: downloadTypes,
          datasets: [{
            label: 'Descargas por Tipo',
            data: counts,
            backgroundColor: ['#6624a5', '#f44336'], // Colores diferentes para cada barra
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#ffffff', // Cambia el color de la leyenda
              }
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}`;
                }
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                color: '#ffffff', // Cambia el color de los números en el eje x
              },
            },
            y: {
              ticks: {
                color: '#ffffff', // Cambia el color de las etiquetas en el eje y
              }
            }
          }
        }
      });
    }
  }

  logout() {
    this.apiService.logout(); 
    this.router.navigate(['/login']); 
  }
}
