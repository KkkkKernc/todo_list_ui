import { FetchTodoAction, DeleteTodoAction, CreateTodoAction, UpdateTodoAction } from './todos';

export enum ActionTypes {
  fetchTodo,
  createTodo,
  updateTodo,
  deleteTodo
}

export type Action = FetchTodoAction | CreateTodoAction | UpdateTodoAction | DeleteTodoAction;
