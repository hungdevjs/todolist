import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setTodos } from '../redux/todos';
import { getTodos } from '../services/firebase.service';
import { TodoItem } from '../interfaces/todos';
import { State } from '../interfaces/states';

const useTodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: State) => state.todos.items);

  useEffect(() => {
    getTodos((newData: TodoItem[]) => dispatch(setTodos(newData)));
  }, [dispatch]);

  return { todos };
};

export default useTodoList;
