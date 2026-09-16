import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);
  
  users: any[] = [];

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data.results || data; 
        console.log('Usuarios cargados:', this.users);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al cargar los usuarios:', err);
      }
    });
  }
  deleteUser(id: string): void {
  if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(user => (user._id || user.id) !== id);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }
}