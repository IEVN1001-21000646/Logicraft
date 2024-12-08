import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class LogicraftServiceService {
  private apiUrl = 'http://127.0.0.1:5000';

   // **Autenticación**
  async login(email: string, password: string) {
    const response = await axios.post(`${this.apiUrl}/auth/login`, { email, password });
    return response.data;
  }

  async register(name: string, email: string, password: string) {
    const response = await axios.post(`${this.apiUrl}/auth/register`, { name, email, password });
    return response.data;
  }

  // **Usuarios**
  async getUsers() {
    const response = await axios.get(`${this.apiUrl}/users`);
    return response.data;
  }

  async deleteUser(id: number) {
    try {
      const response = await axios.delete(`${this.apiUrl}/users/${id}`);
      return response.data; // Devuelve la respuesta del backend
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      
    }
  }

  // **Anuncios**
  // Obtener todos los anuncios
async getAds() {
  try {
    const response = await axios.get(`${this.apiUrl}/ads`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener anuncios:', error);
    throw new Error('No se pudieron cargar los anuncios.');
  }
}

// Eliminar un anuncio
async deleteAd(id: number) {
  try {
    const response = await axios.delete(`${this.apiUrl}/ads/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar anuncio:', error);
    throw new Error('No se pudo eliminar el anuncio.');
  }
}

// Actualizar un anuncio
async updateAd(id: number, updatedAd: { name: string; duration: number }) {
  try {
    const response = await axios.put(`${this.apiUrl}/ads/${id}`, updatedAd);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar anuncio:', error);
    throw new Error('No se pudo actualizar el anuncio.');
  }
}


  async addAd(ad: { name: string; duration: number }) {
    const response = await axios.post(`${this.apiUrl}/ads`, ad);
    return response.data;
  }

  // **Estadísticas**
  async getStatistics() {
    try {
      const response = await axios.get(`${this.apiUrl}/stats`);
      return response.data; // Devuelve las estadísticas obtenidas del backend
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      throw new Error('No se pudieron obtener las estadísticas.');
    }
  }

  // **Tienda**
  async downloadDemo() {
    try {
      const response = await axios.get(`${this.apiUrl}/store/download`, {
        responseType: 'blob', // Importante para manejar archivos binarios
      });
  
      // Crear un enlace temporal para la descarga del archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Logicraft().apk'); // Nombre del archivo descargado
      document.body.appendChild(link);
      link.click();
      link.remove();
  
      alert('Archivo descargado correctamente.');
    } catch (error) {
      console.error('Error descargando el archivo:', error);
      alert('No se pudo descargar el archivo.');
    }
  }

  async processPayment(paymentData: any) {
    try {
      const response = await axios.post(`${this.apiUrl}/payments/process`, paymentData);
      return response.data;
    } catch (error) {
      console.error('Error procesando el pago:', error);
      throw new Error('No se pudo procesar el pago.');
    }
  }
  

  async updateUser(id: number, updatedUser: { name: string; email: string; role: string }) {
    try {
      const response = await axios.put(`${this.apiUrl}/users/${id}`, updatedUser);
      return response.data; 
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      
    }
  }
  
  async addUser(newUser: { name: string; email: string; role: string }) {
    try {
      const response = await axios.post(`${this.apiUrl}/users`, newUser); 
      return response.data; 
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      
    }
  }

  async getPayments() {
    try {
      const response = await axios.get(`${this.apiUrl}/payments`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener pagos:', error);
      throw new Error('No se pudieron cargar los pagos.');
    }
  }

  async deletePayment(id: number) {
    try {
      const response = await axios.delete(`${this.apiUrl}/payments/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar pago:', error);
      throw new Error('No se pudo eliminar el pago.');
    }
  }
  
  async downloadFull(paymentId: number) {
    try {
      const response = await axios.post(
        `${this.apiUrl}/store/download-full`,
        { payment_id: paymentId },
        { responseType: 'blob' } 
      );
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Logicraft.apk'); 
      document.body.appendChild(link);
      link.click();
      link.remove();
  
      alert('Archivo completo descargado correctamente.');
    } catch (error) {
      console.error('Error descargando el archivo completo:', error);
      alert('No se pudo descargar el archivo completo. Verifica tu pago.');
    }
  }

  async searchUsers(query: string) {
    try {
      const response = await axios.get(`${this.apiUrl}/users/search`, {
        params: { name: query } 
      });
      return response.data;
    } catch (error) {
      console.error('Error buscando usuarios:', error);
      throw error;
    }
  }


 
  getPaymentData() {
    return axios.get(`${this.apiUrl}/api/payment-stats`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error al obtener los datos de pagos:', error);
        throw error;
      });
  }

  async getUserStats() {
    try {
      const response = await axios.get(`${this.apiUrl}/api/user-stats`);
      return response.data; // Devuelve los datos recibidos del backend
    } catch (error) {
      console.error('Error al obtener las estadísticas de usuarios:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  }

  async getDownloadStats() {
    try {
      const response = await axios.get(`${this.apiUrl}/api/download-stats`);
      return response.data; // Devuelve los datos del backend
    } catch (error) {
      console.error('Error al obtener las estadísticas de descargas:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  }

  async getApis() {
    const response = await axios.get(`${this.apiUrl}/api/list`);
    return response.data;
  }

  async registerApi(api: any) {
    const response = await axios.post(`${this.apiUrl}/api/register`, api);
    return response.data;
  }
  
  async deleteApi(id: number) {
    const response = await axios.delete(`${this.apiUrl}/api/delete/${id}`);
    return response.data;
  }

  async updateApi(id: number, updatedApi: any) {
    const response = await axios.put(`${this.apiUrl}/api/update/${id}`, updatedApi);
    return response.data;
  }


  logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('token'); 
    localStorage.clear(); 
  }
  
  

  
}
