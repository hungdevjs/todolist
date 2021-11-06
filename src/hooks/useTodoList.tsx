import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setTodos } from '../redux/todos';
import { getTodos } from '../services/firebase.service';
import { TodoItem } from '../interfaces/todos';
import { State } from '../interfaces/states';

const useTodoList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const todos = useSelector((state: State) => state.todos.items);

  useEffect(() => {
    getTodos((newData: TodoItem[]) => dispatch(setTodos(newData)));
  }, [dispatch]);

  const goToTodoDetail = useCallback(
    (id?: string) => {
      const url = id ? `/todos/${id}` : '/new-todo';
      history.push(url);
    },
    [history],
  );

  return { todos, goToTodoDetail };
};

export default useTodoList;
