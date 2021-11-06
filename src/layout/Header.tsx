import { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

import { State } from '../interfaces/states';
import { ROUTES, USERNAME } from '../utils/constants';

const Header: FC = () => {
  const history = useHistory();
  const user = useSelector((state: State) => state.commons.user);

  const logout = useCallback(() => {
    localStorage.removeItem(USERNAME);
    history.push(ROUTES.LOGIN);
  }, [history]);

  return (
    <div className="d-flex align-items-center justify-content-between header">
      <span>
        Hello <b className="mx-2">{user?.name}</b>
      </span>
      <span
        className="cursor-pointer d-flex align-items-center logout-text"
        onClick={logout}
      >
        Logout
        <LogoutIcon className="mx-2" />
      </span>
    </div>
  );
};

export default Header;
