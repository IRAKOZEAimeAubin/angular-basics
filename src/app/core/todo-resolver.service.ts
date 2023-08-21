import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { Todo } from '../types/todos';
import { TodoTrackerError } from '../types/todoAppError';

@Injectable({
  providedIn: 'root',
})
export class TodoResolverService {
  constructor(private dataService: DataService) {}

  resolve: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Todo[] | TodoTrackerError> => {
    return this.dataService.getAllTodos().pipe(catchError((err) => of(err)));
  };
}
