import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

//routes
import Login from './auth/Login';
import Registration from './auth/Registration';
import TodoList from './todo/TodoList';

const Routes = () => (
  <Switch>
    <PrivateRoute exact path='/' component={TodoList} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Registration} />
  </Switch>
);

export default withRouter(Routes);
