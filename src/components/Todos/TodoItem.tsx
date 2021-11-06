import { FC } from 'react';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { TodoItem as ITodoItem } from '../../interfaces/todos';
import { DATE_FORMAT } from '../../utils/constants';

interface Props {
  item: ITodoItem;
  onEdit: Function;
  onRemove: Function;
  toggleStatus: Function;
}

const TodoItem: FC<Props> = ({
  item,
  onEdit,
  onRemove,
  toggleStatus,
}: Props) => {
  return (
    <Grid container className="p-3 todo-item">
      <Grid item xs={3} className="d-flex justify-content-center">
        <img src={item.image} className="todo-item-image" alt="todo" />
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
            <div className="d-flex">
              <EditIcon
                className="cursor-pointer mx-2 text-primary"
                onClick={() => onEdit(item.id)}
              />
              <DeleteIcon
                className="cursor-pointer text-danger"
                onClick={() => onRemove(item.id)}
              />
            </div>
          </div>
          <div className="mb-2">
            <p className="todo-item-description">{item.description}</p>
          </div>
          <div>
            Completed:
            <Checkbox
              checked={item.isDone}
              onChange={(e) => toggleStatus(item.id, e.target.checked)}
              color="success"
            />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default TodoItem;
