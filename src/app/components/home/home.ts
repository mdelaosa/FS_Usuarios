import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private userService = inject(UserService);
  
  users: any[] = [];

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data.results || data; 
        console.log('Usuarios cargados:', this.users);
      },
      error: (err) => {
        console.error('Error al cargar los usuarios:', err);
      }
    });
  }
}