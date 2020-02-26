import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './actionTypes';
import { Todo } from '../reducers/index';

export interface FetchTodoAction {
  type: ActionTypes.fetchTodo;
  payload: Todo[];
}

export interface CreateTodoAction {
  type: ActionTypes.createTodo;
  payload: Todo;
}

export interface UpdateTodoAction {
  type: ActionTypes.updateTodo;
  payload: Todo;
}

export interface DeleteTodoAction {
  type: ActionTypes.deleteTodo;
  payload: number;
}

export const fetchTodo = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<Todo[]>('http://localhost:8080/api/todos');

    dispatch<FetchTodoAction>({
      type: ActionTypes.fetchTodo,
      payload: response.data
    });
  }
}

export const createTodo = (title: string) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.post<Todo>('http://localhost:8080/api/todo', { title });

    dispatch<CreateTodoAction>({
      type: ActionTypes.createTodo,
      payload: response.data
    });
  }
}

export const updateTodo = (todo: Todo) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.put<Todo>(`http://localhost:8080/api/todos/${todo.id}`, todo)

    dispatch<UpdateTodoAction>({
      type: ActionTypes.updateTodo,
      payload: response.data
    })
  }
}

export const deleteTodo = (id: number) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.delete<any>(`http://localhost:8080/api/todos/${id}`);

    if (response.status === 200 && response.data.deleteCount > 0) {
      dispatch<DeleteTodoAction>({
        type: ActionTypes.deleteTodo,
        payload: id
      })
    }
  }
}
