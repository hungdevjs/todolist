import { combineReducers } from 'redux';

import { State } from '../interfaces/states';
import commons from './commons';
import todos from './todos';

export default combineReducers<State>({
  commons,
  todos,
});
