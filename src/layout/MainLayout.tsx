import { FC, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Switch, Route, Redirect } from 'react-router-dom';

import { setLoading, setUser } from '../redux/commons';
import { State } from '../interfaces/states';
import { authRoutes } from '../configs/routes';
import { getUsername } from '../utils/helpers';
import { ROUTES } from '../utils/constants';

const MainLayout: FC = () => {
  const user = useSelector((state: State) => state.commons.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const getAuth = useCallback(() => {
    dispatch(setLoading(true));
    try {
      const username = getUsername();
      if (!username) throw new Error('Not authorized');

      dispatch(setUser({ name: username }));
    } catch (err: any) {
      history.push(ROUTES.LOGIN);
    }
    dispatch(setLoading(false));
  }, [dispatch, history]);

  useEffect(() => {
    getAuth();
  }, [getAuth]);

  if (!user) return null;
  return (
    <>
      <Switch>
        {authRoutes.map((route) => {
          return (
            <Route
              key={route.name}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          );
        })}
        <Redirect from="/*" to={ROUTES.TODO_LIST} />
      </Switch>
    </>
  );
};

export default MainLayout;
