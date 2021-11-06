import Login from '../pages/Login/Login';
import TodoList from '../pages/Todos/TodoList';
import TodoDetail from '../pages/Todos/TodoDetail';

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
    name: 'TodoDetail',
    path: ROUTES.TODO_DETAIL,
    component: TodoDetail,
    exact: true,
  },
  {
    name: 'NewTodo',
    path: ROUTES.NEW_TODO,
    component: TodoDetail,
    exact: true,
  },
];
