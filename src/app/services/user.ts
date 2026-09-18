import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://peticiones.online/api/users';
    constructor(private http: HttpClient) {}

    getAllUsers(): Observable<any> {
      return this.http.get<any>(this.apiUrl);
    }

    getUserById(id: string): Observable<any> {
      return this.http.get<any>(`https://peticiones.online/api/users/${id}`);
    }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}