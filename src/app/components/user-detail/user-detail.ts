import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './user-detail.html',
  styleUrls: ['./user-detail.css']
})

export class UserDetail implements OnInit {
  user: any = null;
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.loadUserDetail(userId);
    }
  }

  loadUserDetail(id: string): void {
    this.userService.getUserById(id).subscribe({
      next: (data: any) => {
        this.user = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error en la cargar del detalle', err)
    });
  }

  deleteUser(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          console.log('OK: Usuario eliminado correctamente');
          this.router.navigate(['/home']); 
        },
        error: (err) => {
          console.error('KO: Error al eliminar el usuario', err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}