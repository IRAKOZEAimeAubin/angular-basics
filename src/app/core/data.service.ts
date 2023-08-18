import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  addTodo(newTodo: Todo): Observable<Todo> {
    return this.http.post<Todo>('http://localhost:8000/todos', newTodo, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  update(updatedTodo: Todo): Observable<void> {
    return this.http.patch<void>(
      `http://localhost:8000/todos/${updatedTodo.todoId}`,
      updatedTodo,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  delete(todoID: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8000/todos/${todoID}`);
  }
}
