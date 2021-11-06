import { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { SxProps } from '@mui/system';

interface Props {
  removeTodoId: string | null;
  setRemoveTodoId: Function;
  remove: Function;
}

const style: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid gray',
  borderRadius: '4px',
  p: 4,
};

const DeleteModal: FC<Props> = ({ removeTodoId, setRemoveTodoId, remove }) => {
  return (
    <Modal
      open={!!removeTodoId}
      onClose={() => setRemoveTodoId(null)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Do you want to remove this todo?
        </Typography>
        <Typography id="modal-modal-description" className="mb-2">
          This action cannot be undo!
        </Typography>
        <div>
          <Button
            variant="contained"
            color="success"
            className="mr-2"
            onClick={() => remove()}
          >
            Remove it!
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setRemoveTodoId(null)}
          >
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
