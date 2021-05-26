import React from 'react';
import { Switch, Route } from 'react-router';

import Login from '../containers/Login';
import Register from '../containers/Register';
import Home from '../containers/Home';
import PrivateRoute from '../containers/PrivateRoute';
import RestrictRoute from '../containers/RestrictRoute';
import Dashboard from '../containers/Dashboard';
import { ROUTES } from '../constants';
import Profile from '../containers/Profile';

const Routes: React.FC = () => {
    return(
        <Switch>
            <PrivateRoute exact path={ ROUTES.DASHBOARD } component={ Dashboard }/>
            <PrivateRoute exact path={ ROUTES.PROFILE } component={ Profile } />
            <RestrictRoute exact path={ ROUTES.HOME } component={ Home } />
            <RestrictRoute exact path={ ROUTES.LOGIN } component={ Login } />
            <RestrictRoute exact path={ ROUTES.REGISTER } component={ Register } />
            <Route path='*' component={ Home } />
        </Switch>
    );
};

export default Routes;
