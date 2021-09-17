import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../containers/Login';
import Register from '../containers/Register';
import Home from '../containers/Home';
import PrivateRoute from '../containers/PrivateRoute';
import RestrictRoute from '../containers/RestrictRoute';
import { ROUTES } from '../constants';
import Dashboard from '../containers/Dashboard';
import ContactProfile from '../components/pages/ContactProfile';
import Profile from '../containers/Profile';
import { Conversations } from '../components/pages/conversations';

const Routes: React.FC = () => {
    return(
        <Switch>
            <PrivateRoute exact path={ ROUTES.DASHBOARD } component={ Dashboard } />
            <PrivateRoute exact path={ ROUTES.CONVERSATIONS } component={ Conversations } />
            <PrivateRoute exact path={ ROUTES.PROFILE } component={ Profile } />
            <PrivateRoute exact path={ ROUTES.CONTACT_PROFILE } component={ ContactProfile } />

            <RestrictRoute exact path={ ROUTES.HOME } component={ Home } />
            <RestrictRoute exact path={ ROUTES.LOGIN } component={ Login } />
            <RestrictRoute exact path={ ROUTES.REGISTER } component={ Register } />
            <Route path='*' component={ Home } >
                <Redirect to={ ROUTES.HOME }/>
            </Route>
        </Switch>
    );
};

export default Routes;
