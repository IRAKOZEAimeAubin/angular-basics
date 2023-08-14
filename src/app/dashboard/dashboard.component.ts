import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../types/todos';
import { DataService } from '../core/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ta-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  allTodos: Todo[] | undefined;
  sub!: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.sub = this.dataService.getAllTodos().subscribe({
      next: (todos) => (this.allTodos = todos),
      error: (err) => console.log(err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
