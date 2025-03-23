import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl1 = 'http://localhost:5001/users'; // Adres naszego API

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl1);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl1, user);
  }
}