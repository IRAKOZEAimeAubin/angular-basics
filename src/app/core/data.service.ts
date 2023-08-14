import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../types/todos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:8000/todos/');
  }

  getTodoById(id: string): Observable<Todo> {
    return this.http.get<Todo>(`http://localhost:8000/todos/${id}`);
  }
}
