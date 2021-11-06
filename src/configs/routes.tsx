import Login from '../pages/Login/Login';
import TodoList from '../pages/Todos/TodoList';
import NewTodo from '../pages/Todos/NewTodo';

import { Route } from '../interfaces/commons';
import { ROUTES } from '../utils/constants';

export const notAuthRoutes: Route[] = [
  {
    name: 'Login',
    path: ROUTES.LOGIN,
    component: Login,
    exact: true,
  },
];

export const authRoutes: Route[] = [
  {
    name: 'TodoList',
    path: ROUTES.TODO_LIST,
    component: TodoList,
    exact: true,
  },
  {
    name: 'NewTodo',
    path: ROUTES.NEW_TODO,
    component: NewTodo,
    exact: true,
  },
];
