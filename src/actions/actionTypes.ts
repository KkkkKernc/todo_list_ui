import { FetchTodoAction, DeleteTodoAction, CreateTodoAction } from './todos';

export enum ActionTypes {
  fetchTodo,
  createTodo,
  updateTodo,
  deleteTodo
}

export type Action = FetchTodoAction | CreateTodoAction | DeleteTodoAction;
