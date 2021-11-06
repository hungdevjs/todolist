import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { setTodos } from '../redux/todos';
import { setLoading } from '../redux/commons';
import { getTodos, removeTodo } from '../services/firebase.service';
import { TodoItem } from '../interfaces/todos';
import { State } from '../interfaces/states';
import { SORTBY } from '../utils/constants';

const useTodoList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const todos = useSelector((state: State) => state.todos.items);
  const [sortBy, setSortBy] = useState(SORTBY.HEADER);
  const [removeTodoId, setRemoveTodoId] = useState<string | null>(null);

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

  const removeData = useCallback(async () => {
    if (!removeTodoId) return;
    dispatch(setLoading(true));
    try {
      await removeTodo(removeTodoId as string);
      setRemoveTodoId(null);
      toast.success('Remove todo successfully');
    } catch (err: any) {
      toast.error(err.message);
    }
    dispatch(setLoading(false));
  }, [removeTodoId, dispatch]);

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

  return {
    filteredTodos,
    sortBy,
    removeTodoId,
    setRemoveTodoId,
    setSortBy,
    goToTodoDetail,
    removeData,
  };
};

export default useTodoList;
