import { FC } from 'react';

export interface User {
  name: string;
}

export interface Route {
  path: string;
  name: string;
  component: FC;
  exact: boolean;
}
