import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import { setUser } from '../redux/commons';
import { ROUTES, USERNAME } from '../utils/constants';

const useLogin = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const login = useCallback((name: string) => {
    localStorage.setItem(USERNAME, name);
    dispatch(setUser({ name }));
    history.push(ROUTES.TODO_LIST);
  }, []);

  return { login };
};

export default useLogin;
