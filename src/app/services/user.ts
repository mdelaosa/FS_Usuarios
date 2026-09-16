import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
  // La URL de donde vamos a sacar los datos
    private apiUrl = 'https://peticiones.online/api/users';

  // Inyectamos HttpClient para poder hacer peticiones web
    constructor(private http: HttpClient) {}

  // Método para pedir la lista de usuarios
    getAllUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
    }
}