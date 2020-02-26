import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodo, updateTodo, createTodo, deleteTodo } from '../actions';
import { Todo, StoreState } from '../reducers';

export const App: React.FC = () => {
  const [fetching, setFetching] = useState(false);
  const [title, setTitle] = useState('');
  const todos = useSelector((state: StoreState) => state.todos);
  const dispatch = useDispatch();

  // componentDidMount，componentDidUpdate 和 componentWillUnmount
  useEffect(() => {
    if (!todos.length) {
      setFetching(true);
      dispatch(fetchTodo())
    } else {
      setFetching(false);
    }
  }, [todos.length]);

  const handleCreate = () => {
    if (title === '') return
    dispatch(createTodo(title))
    setTitle('')
  }

  const handleChange = (todo: Todo) => {
    dispatch(updateTodo({
      id: todo.id,
      title: todo.title,
      completed: !todo.completed
    }))
  }

  const operator = (
    <div>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
      <button onClick={handleCreate}>创建</button>
      <button onClick={() => {dispatch(fetchTodo())}}>获取</button>
    </div>
  )

  const curTodos = todos.map((todo: Todo) => (
    <div key={todo.id} style={{ marginTop: '10px' }}>
      <input type="checkbox" checked={todo.completed} onChange={() => handleChange(todo)}/>
      <span style={todo.completed ? { textDecoration: 'line-through' } : {}}>{todo.title}</span>
      <button onClick={() => dispatch(deleteTodo(todo.id))}>删除</button>
    </div>
  ));

  return (
    <>
      {fetching ? 'LOADING...' : null}
      {operator}
      {curTodos}
    </>
  );
};
