import { FC } from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

import { State } from '../../interfaces/states';

const Loading: FC = () => {
  const isLoading = useSelector((state: State) => state.commons.isLoading);

  if (!isLoading) return null;

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 vw-100 loading">
      <CircularProgress color="success" />
    </div>
  );
};

export default Loading;
