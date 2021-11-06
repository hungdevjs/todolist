import { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { getUsername } from '../utils/helpers';
import { ROUTES } from '../utils/constants';

const useCheckAuth = () => {
  const history = useHistory();

  const checkAuth = useCallback(() => {
    const username = getUsername();
    if (!!username) {
      history.push(ROUTES.TODO_LIST);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);
};

export default useCheckAuth;
