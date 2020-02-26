import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodo, updateTodo, createTodo } from '../actions';
import { Todo, StoreState } from '../reducers';

export const App: React.FC = () => {
  const [fetching, setFetching] = useState(false);
  const todos = useSelector((state: StoreState) => state.todos);
  const dispatch = useDispatch();

  // componentDidMount，componentDidUpdate 和 componentWillUnmount
  useEffect(() => {
    if (!todos.length) {
      setFetching(false);
    }
  }, [todos.length]);

  const curTodos = todos.map((todo: Todo) => (
    <div key={todo.id}>
      <button
        style={{ border: '1px solid black' }}
        onClick={() => dispatch(updateTodo({
          id: todo.id,
          title: todo.title,
          completed: !todo.completed
        }))}>
        {todo.title} {todo.completed}
      </button>
    </div>
  ));

  return (
    <div>
      <button onClick={() => {
          dispatch(createTodo('test create Todo'))
        }}>
        创建
      </button>
      <button
        onClick={() => {
          dispatch(fetchTodo());
          }}>
        获取
      </button>
      {fetching ? 'LOADING...' : null}
      {curTodos}
    </div>
  );
};
