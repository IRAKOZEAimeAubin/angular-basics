import {
  HttpClient,
  HttpContext,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../types/todos';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { TodoTrackerError } from '../types/todoAppError';
import { CONTENT_TYPE } from './add-header.interceptor';
import { CACHEABLE } from './cache.interceptor';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  private handleHttpError(
    error: HttpErrorResponse
  ): Observable<TodoTrackerError> {
    let dataError = new TodoTrackerError();
    dataError.errorNumber = error.status;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An Error occured retrieving data.';
    return throwError(() => dataError);
  }

  getAllTodos(): Observable<Todo[] | TodoTrackerError> {
    return this.http
      .get<Todo[]>('http://localhost:8000/todos/', {
        context: new HttpContext().set(CACHEABLE, false),
      })
      .pipe(catchError((err) => this.handleHttpError(err)));
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
