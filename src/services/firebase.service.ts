import firebase from '../configs/firebase';
import { TODOS } from '../utils/constants';
import { TodoItem } from '../interfaces/todos';

const todos = firebase.firestore().collection(TODOS);
const storage = firebase.storage();

export const getTodos = (callback: Function) => {
  todos.onSnapshot((snapshot) => {
    const newData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(newData);
  });
};

export const getTodo = async (todoId: string) => {
  const query = todos.doc(todoId);
  const data = await query.get();
  return data.data();
};

export const createTodo = async (data: Partial<TodoItem>) => {
  await todos.add(data);
};

export const updateTodo = async (todoId: string, data: Partial<TodoItem>) => {
  await todos.doc(todoId).update(data);
};

export const removeTodo = async (todoId: string) => {
  await todos.doc(todoId).delete();
};

export const uploadImage = (
  file: any,
  handleProgress: Function,
  handleError: Function,
  handleComplete: Function,
) => {
  const imageRef = storage.ref(`${Date.now()}-${file.name}`);
  const task = imageRef.put(file);

  const onProgress = (snapshot: any) => handleProgress(snapshot);

  const onError = () => handleError();

  const onComplete = async () => {
    const url = await imageRef.getDownloadURL();
    handleComplete(url);
  };

  task.on('state_changed', onProgress, onError, onComplete);
};
