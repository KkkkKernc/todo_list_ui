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
  payload: string;
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

export const createTodos = (title: string) => {
  return async (dispatch: Dispatch) => {

    dispatch<CreateTodoAction>({
      type: ActionTypes.createTodo,
      payload: title
    });
  }
}

export const deleteTodo = (id: number): DeleteTodoAction => {
  return {
    type: ActionTypes.deleteTodo,
    payload: id
  }
}
