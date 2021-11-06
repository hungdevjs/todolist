import { User } from './commons';
import { TodoItem } from './todos';

export interface CommonState {
  isLoading: boolean;
  user: User | null;
}

export interface TodoState {
  items: TodoItem[];
}

export interface State {
  commons: CommonState;
  todos: TodoState;
}
