import { useEffect, useCallback, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { setLoading } from '../redux/commons';
import { getTodo, createTodo, updateTodo } from '../services/firebase.service';
import { TodoItem } from '../interfaces/todos';
import { State } from '../interfaces/states';
import { ROUTES } from '../utils/constants';

const initData: Partial<TodoItem> = {
  id: '',
  header: '',
  description: '',
  image: 'https://picsum.photos/200',
  isDone: false,
};

const useTodoDetail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.commons.user);
  const [data, setData] = useState<Partial<TodoItem>>(initData);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { todoId } = useParams<{ todoId: string }>();

  const getData = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      if (todoId) {
        const todo = (await getTodo(todoId)) as TodoItem;
        setData(todo);
      } else {
        setIsEditing(true);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
    dispatch(setLoading(false));
  }, [todoId, dispatch]);

  const updateData = useCallback(
    async (newData: Partial<TodoItem>) => {
      dispatch(setLoading(true));
      try {
        const { header, description, image, isDone } = newData;
        const dataToUpdate = {
          header,
          description,
          image,
          isDone,
          creator: user?.name,
          createdAt: Date.now(),
        };

        const isNew = !todoId;
        if (isNew) {
          await createTodo(dataToUpdate);
        } else {
          await updateTodo(todoId, dataToUpdate);
        }
        setIsEditing(false);
        toast.success(`${isNew ? 'Create' : 'Update'} todo successfully!`);
      } catch (err: any) {
        toast.error(err.message);
      }
      dispatch(setLoading(false));
    },
    [todoId, user?.name, dispatch],
  );

  const backToList = useCallback(() => {
    history.push(ROUTES.TODO_LIST);
  }, [history]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, updateData, isEditing, setIsEditing, backToList };
};

export default useTodoDetail;
