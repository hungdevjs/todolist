import { FC } from 'react';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer: FC = () => {
  return (
    <div className="d-flex align-items-center justify-content-center footer">
      From <b className="mx-2">hungdev.js</b> with{' '}
      <KeyboardIcon className="mx-2 keyboard" /> and
      <FavoriteIcon className="mx-2 heart" />
    </div>
  );
};

export default Footer;
