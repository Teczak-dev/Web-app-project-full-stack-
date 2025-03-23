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
  private taskUrl = 'http://localhost:5001/tasks';
  private taskDeleteUrl = 'http://localhost:5001/tasks/delete';
  private taskUpdateUrl = 'http://localhost:5001/tasks/update'

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

  getTasks(): Observable<any>{
    return this.http.get(this.taskUrl);
  }

  addTask(task: any): Observable<any>{
    return this.http.post(this.taskUrl, task)
  }

  deleteTask(task: any): Observable<any> {
    return this.http.post(this.taskDeleteUrl, task);
  }

  updateTask(task:any): Observable<any>{
    return this.http.post(this.taskUpdateUrl, task);
  }

}