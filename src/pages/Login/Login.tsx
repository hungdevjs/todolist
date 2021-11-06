import { FC } from 'react';

import useCheckAuth from '../../hooks/useCheckAuth';

const Login: FC = () => {
  useCheckAuth();
  return <>Login</>;
};

export default Login;
