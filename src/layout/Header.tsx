import { FC } from 'react';
import { useSelector } from 'react-redux';

import { State } from '../interfaces/states';

const Header: FC = () => {
  const user = useSelector((state: State) => state.commons.user);

  return (
    <div className="d-flex align-items-center header">
      Hello <b className="mx-2">{user?.name}</b>
    </div>
  );
};

export default Header;
