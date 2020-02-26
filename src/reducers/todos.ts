import { Action, ActionTypes } from '../actions';
import { Todo } from './index';
export const todosReducer = (state: Todo[] = [], action: Action) => {
  switch (action.type) {

    case ActionTypes.fetchTodo:
      return action.payload;

    case ActionTypes.createTodo:
      return state.concat(action.payload);

    case ActionTypes.updateTodo:
      return state.map((todo: Todo) => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }
        return todo;
      });

    case ActionTypes.deleteTodo:
      return state.filter((todo: Todo) => todo.id !== action.payload);

    default:
      return state;
  }
};
