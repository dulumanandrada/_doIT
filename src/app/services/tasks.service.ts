import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../models/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/tasks';

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.url)
  }

  getTaskById(id: number): Observable<ITask> {
    return this.http.get<ITask>(`${this.url}/${id}`)
  }

  addTask(data: ITask): Observable<ITask> {
    return this.http.post<ITask>(`${this.url}`, data)
  } 

  editTask(id: number, data: ITask): Observable<ITask> {
    return this.http.put<ITask>(`${this.url}/${id}`, data)
  }
}
