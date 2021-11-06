import { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './scss/main.scss';

import Loading from './components/commons/Loading';
import store from './redux/_store';
import { notAuthRoutes } from './configs/routes';
import MainLayout from './layout/MainLayout';

const App: FC = () => {
  return (
    <Provider store={store}>
      <ToastContainer autoClose={2000} hideProgressBar newestOnTop />
      <Loading />
      <Router>
        <Switch>
          {notAuthRoutes.map((route) => (
            <Route
              key={route.name}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
          <Route path="/" component={MainLayout} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
