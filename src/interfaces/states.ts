import { User } from './commons';

export interface CommonState {
  isLoading: boolean;
  user: User | null;
}

export interface State {
  commons: CommonState;
}
