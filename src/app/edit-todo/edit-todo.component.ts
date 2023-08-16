import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../types/todos';
import { DataService } from '../core/data.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ta-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css'],
})
export class EditTodoComponent implements OnInit, OnDestroy {
  selectedTodo: Todo | undefined;
  sub!: Subscription;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let todoId: string = this.route.snapshot.params['id'];
    this.sub = this.dataService.getTodoById(todoId).subscribe({
      next: (todo) => (this.selectedTodo = todo),
      error: (err) => console.log(err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
