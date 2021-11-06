import { FC } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import FullContent from '../../layout/FullContent';
import TodoItem from '../../components/Todos/TodoItem';
import DeleteModal from '../../components/Todos/DeleteModal';
import useTodoList from '../../hooks/useTodoList';
import { SORTBY } from '../../utils/constants';

const TodoList: FC = () => {
  const {
    filteredTodos: todos,
    sortBy,
    removeTodoId,
    setRemoveTodoId,
    setSortBy,
    goToTodoDetail,
    removeData,
    toggleStatus,
  } = useTodoList();

  return (
    <FullContent>
      <DeleteModal
        removeTodoId={removeTodoId}
        setRemoveTodoId={setRemoveTodoId}
        remove={removeData}
      />
      <Container className="p-3">
        <div className="mb-2">
          <Button onClick={() => goToTodoDetail()}>Add new todo</Button>
        </div>
        <div className="ml-2">
          <span className="sortby-text">Sort by </span>{' '}
          <ToggleButtonGroup
            color="primary"
            size="small"
            value={sortBy}
            exclusive
            onChange={(_e: any, value: any) => setSortBy(value)}
          >
            <ToggleButton value={SORTBY.HEADER}>Alphabet</ToggleButton>
            <ToggleButton value={SORTBY.CREATEDAT}>Time</ToggleButton>
          </ToggleButtonGroup>
        </div>
        {!!todos.length ? (
          <Grid container spacing={2} className="p-2">
            {todos.map((item) => (
              <Grid item md={4} key={item.id} className="w-100">
                <TodoItem
                  item={item}
                  onEdit={(id: string) => goToTodoDetail(id)}
                  onRemove={(id: string) => setRemoveTodoId(id)}
                  toggleStatus={toggleStatus}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <p className="text-center my-2">No todo.</p>
        )}
      </Container>
    </FullContent>
  );
};

export default TodoList;
