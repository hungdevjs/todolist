import { useEffect, useCallback, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { setLoading } from '../redux/commons';
import {
  getTodo,
  createTodo,
  updateTodo,
  uploadImage,
} from '../services/firebase.service';
import { TodoItem } from '../interfaces/todos';
import { State } from '../interfaces/states';
import { ROUTES } from '../utils/constants';
import useImageReader from './useImageReader';

const initData: Partial<TodoItem> = {
  id: '',
  header: '',
  description: '',
  image: '',
  isDone: false,
};

const useTodoDetail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.commons.user);
  const [data, setData] = useState<Partial<TodoItem>>(initData);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { todoId } = useParams<{ todoId: string }>();
  const { file, imagePreviewUrl, handleImageChange } = useImageReader();

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
    [todoId, user?.name, dispatch],
  );

  const submit = useCallback(
    (newData: Partial<TodoItem>) => {
      dispatch(setLoading(true));
      try {
        if (!file && !newData.image) throw new Error('Image is required');
        if (file) {
          const handleProgress = () => {};
          const handleError = () => {
            toast.error('Something is error. Try again!');
            dispatch(setLoading(false));
          };
          const handleComplete = async (url: string) => {
            newData.image = url;
            await updateData(newData);
            dispatch(setLoading(false));
          };
          uploadImage(file, handleProgress, handleError, handleComplete);
        } else {
          updateData(newData);
        }
      } catch (err: any) {
        toast.error(err.message);
      }
    },
    [file, updateData],
  );

  const backToList = useCallback(() => {
    history.push(ROUTES.TODO_LIST);
  }, [history]);

  useEffect(() => {
    getData();
  }, [getData]);

  return {
    data,
    updateData,
    isEditing,
    setIsEditing,
    backToList,
    imagePreviewUrl,
    handleImageChange,
    submit,
    todoId,
  };
};

export default useTodoDetail;
