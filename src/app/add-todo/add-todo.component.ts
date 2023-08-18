import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';
import { Subscription } from 'rxjs';
import { Todo } from '../types/todos';

@Component({
  selector: 'ta-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  tag!: string;

  constructor(private dataService: DataService) {}

  ngOnInit() {}

  ngOnDestroy() {}

  saveTodo(formValues: any): void {
    let newTodo: Todo = <Todo>formValues;
    newTodo.tags = this.tag.split(',');
    console.log(newTodo);
    this.sub = this.dataService.addTodo(newTodo).subscribe({
      next: (todo) => console.log(todo),
      error: (err) => console.log(err),
    });
  }
}
