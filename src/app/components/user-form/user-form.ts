import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user';
import { CommonModule } from '@angular/common';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  standalone: true,
  selector: 'app-user-form',
  styleUrl: './user-form.css',
  templateUrl: './user-form.html',
})
export class UserForm implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  userId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.isEditMode = true;
      this.userService.getUserById(this.userId).subscribe({
        next: (data) => {
          this.userForm.patchValue(data);
        },
        error: (err: any) => console.error('Error al editar', err)
      });
    }
    this.userForm.get('email')?.valueChanges.subscribe(email => {
      if (email && email.includes('@')) {
        const extractedUsername = email.split('@')[0];
        this.userForm.get('username')?.setValue(extractedUsername, { emitEvent: false });
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;

      if (this.isEditMode && this.userId) {
        this.userService.updateUser(this.userId, userData).subscribe({
          next: () => {
            console.log('OK: Usuario actualizado correctamente');
            this.router.navigate(['/user', this.userId]);
          },
          error: (err) => console.error('Error al actualizar', err)
        });
      } else {
        this.userService.createUser(userData).subscribe({
          next: () => {
            console.log('OK: Usuario creado correctamente');
            this.router.navigate(['/home']);
          },
          error: (err) => console.error('Error al crear', err)
        });
      }
    } else {
      console.log('Formulario inválido.');
    }
  }
} 
