import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { TodoResolverService } from './core/todo-resolver.service';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: { resolvedTodos: TodoResolverService },
  },
  { path: 'addTodo', component: AddTodoComponent },
  { path: 'edittodo/:id', component: EditTodoComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
