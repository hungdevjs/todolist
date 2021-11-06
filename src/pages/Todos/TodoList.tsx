import { FC } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import FullContent from '../../layout/FullContent';
import TodoItem from '../../components/Todos/TodoItem';
import useTodoList from '../../hooks/useTodoList';

const TodoList: FC = () => {
  const { todos } = useTodoList();
  return (
    <FullContent>
      <Container className="p-3">
        <div>
          <Button>Add new todo</Button>
        </div>
        {!!todos.length ? (
          <Grid container spacing={2} className="p-2">
            {todos.map((item) => (
              <Grid item md={4} key={item.id}>
                <TodoItem item={item} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <p className="text-center">No todo.</p>
        )}
      </Container>
    </FullContent>
  );
};

export default TodoList;
