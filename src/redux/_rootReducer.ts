import { combineReducers } from 'redux';

import { State } from '../interfaces/states';
import commons from './commons';

export default combineReducers<State>({
  commons,
});
