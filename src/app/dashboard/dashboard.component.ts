import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../types/todos';
import { DataService } from '../core/data.service';
import { Subscription } from 'rxjs';
import { TodoTrackerError } from '../types/todoAppError';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ta-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  allTodos!: Todo[];
  sub!: Subscription;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.sub = this.dataService.getAllTodos().subscribe({
    //   next: (todos) => (this.allTodos = <Todo[]>todos),
    //   error: (err) => console.log(err),
    // });
    let resolvedData: Todo[] | TodoTrackerError =
      this.route.snapshot.data['resolvedTodos'];

    if (resolvedData instanceof TodoTrackerError)
      console.log(`${resolvedData.friendlyMessage}`);
    else this.allTodos = resolvedData;
  }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }

  ngOnDestroy(): void {}
}
