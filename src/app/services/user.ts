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

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}