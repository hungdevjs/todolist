import firebase from '../configs/firebase';
import { TODOS } from '../utils/constants';

const todos = firebase.firestore().collection(TODOS);

export const getTodos = (callback: Function) => {
  todos.onSnapshot((snapshot) => {
    const newData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(newData);
  });
};
