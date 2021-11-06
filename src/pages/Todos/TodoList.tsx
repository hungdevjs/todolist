import { FC } from 'react';

import FullContent from '../../layout/FullContent';
import useTodoList from '../../hooks/useTodoList';

const TodoList: FC = () => {
  const { todos } = useTodoList();
  return <FullContent>{todos.length}</FullContent>;
};

export default TodoList;
