import { User } from './users';

export interface Todo {
  todoId: string;
  title: string;
  description: string;
  tags: string[];
  status: string;
  published: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}
