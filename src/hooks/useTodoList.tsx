import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setTodos } from '../redux/todos';
import { getTodos } from '../services/firebase.service';
import { TodoItem } from '../interfaces/todos';
import { State } from '../interfaces/states';
import { SORTBY } from '../utils/constants';

const useTodoList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const todos = useSelector((state: State) => state.todos.items);
  const [sortBy, setSortBy] = useState(SORTBY.HEADER);

  const filteredTodos = useMemo(() => {
    if (sortBy === SORTBY.HEADER)
      return [...todos].sort((item1, item2) =>
        item1.header.toLowerCase().localeCompare(item2.header.toLowerCase()),
      );
    if (sortBy === SORTBY.CREATEDAT)
      return [...todos].sort(
        (item1, item2) => item2.createdAt - item1.createdAt,
      );
    return todos;
  }, [todos, sortBy]);

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

  return { filteredTodos, sortBy, setSortBy, goToTodoDetail };
};

export default useTodoList;
