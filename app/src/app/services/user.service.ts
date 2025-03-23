import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'http://localhost:5001/users';
  private tableUrl = 'http://localhost:5001/tables';
  private tableDeleteUrl = 'http://localhost:5001/tables/delete';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.usersUrl);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.usersUrl, user);
  }

  getTables(): Observable<any> {
    return this.http.get(this.tableUrl);
  }

  addTable(table: any): Observable<any> {
    return this.http.post(this.tableUrl, table);
  }

  deleteTable(table: any): Observable<any> {
    return this.http.post(this.tableDeleteUrl, table);
  }

}