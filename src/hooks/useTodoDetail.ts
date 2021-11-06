import { useEffect, useCallback, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

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
  const user = useSelector((state: State) => state.commons.user);
  const [data, setData] = useState<Partial<TodoItem>>(initData);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { todoId } = useParams<{ todoId: string }>();

  const getData = useCallback(async () => {
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
  }, [todoId]);

  const updateData = useCallback(
    async (newData: Partial<TodoItem>) => {
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
    },
    [todoId, user?.name],
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
