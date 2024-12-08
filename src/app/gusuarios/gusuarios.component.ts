import { Component, OnInit } from '@angular/core';
import { LogicraftServiceService } from '../logicraft-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gusuarios',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './gusuarios.component.html',
  styleUrl: './gusuarios.component.css'
})
export class GusuariosComponent implements OnInit {

  users: any[] = []; 
  selectedUser: any = null; 
  addingUser: boolean = false; 
  newUser: any = { name: '', email: '', role: 'client' };
  searchQuery: string = ''; 


  constructor(private userService: LogicraftServiceService, private router: Router) {}

  async ngOnInit() {
    await this.loadUsers();
  }

  async loadUsers() {
    try {
      this.users = await this.userService.getUsers();
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      alert('No se pudieron cargar los usuarios.');
    }
  }

  async searchUsers() {
    if (this.searchQuery.trim() === '') {
      this.loadUsers(); // Si no hay query, se cargan todos los usuarios
    } else {
      try {
        this.users = await this.userService.searchUsers(this.searchQuery);
      } catch (error) {
        console.error('Error al buscar usuarios:', error);
      }
    }
  } 

  editUser(user: any) {
    this.selectedUser = { ...user }; 
  }

  cancelEdit() {
    this.selectedUser = null; 
  }

  async updateUser() {
    try {
      if (!this.selectedUser) return;
      await this.userService.updateUser(this.selectedUser.id, this.selectedUser); // Llama al servicio
      alert(`Usuario con ID ${this.selectedUser.id} actualizado correctamente.`);
      this.selectedUser = null; 
      await this.loadUsers(); 
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      alert('No se pudo actualizar el usuario.');
    }
  }

  async deleteUser(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await this.userService.deleteUser(id);
        this.users = this.users.filter(user => user.id !== id);
        alert(`Usuario con ID ${id} eliminado correctamente.`);
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert('No se pudo eliminar el usuario.');
      }
    }
  }

  startAddUser() {
    this.addingUser = true;
  }

  cancelAdd() {
    this.addingUser = false;
    this.newUser = { name: '', email: '', role: 'client' }; 
  }

  async addUser() {
    try {
      await this.userService.addUser(this.newUser); 
      alert(`Usuario ${this.newUser.name} agregado correctamente.`);
      this.cancelAdd(); 
      await this.loadUsers(); 
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      alert('No se pudo agregar el usuario.');
    }
  }

  logout() {
    this.userService.logout(); 
    this.router.navigate(['/login']);
  }

}
