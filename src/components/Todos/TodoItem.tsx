import { FC } from 'react';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { TodoItem as ITodoItem } from '../../interfaces/todos';
import { DATE_FORMAT } from '../../utils/constants';

interface Props {
  item: ITodoItem;
}

const TodoItem: FC<Props> = ({ item }: Props) => {
  return (
    <Grid container className="p-3 todo-item">
      <Grid item xs={3} className="d-flex justify-content-center">
        <img src={item.image} className="todo-item-image" />
      </Grid>
      <Grid item xs={9}>
        <div className="ml-2">
          <div className="mb-2 d-flex justify-content-between">
            <div>
              <p className="mb-2 todo-item-info">{item.creator}</p>
              <p className="mb-2 todo-item-info">
                {moment(new Date(item.createdAt)).format(DATE_FORMAT)}
              </p>
              <p className="todo-item-header">{item.header}</p>
            </div>
            <div>
              <EditIcon className="cursor-pointer mx-2 text-primary" />
              <DeleteIcon className="cursor-pointer text-danger" />
            </div>
          </div>
          <div className="mb-2">
            <p className="todo-item-description">{item.description}</p>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default TodoItem;
