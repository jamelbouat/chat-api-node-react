import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { ROUTES } from '../constants';
import { IRoute } from '../interfaces';

const PrivateRoute: React.FC<IRoute> = (props) => {
    const { isAuthenticated, component: Component, ...rest } = props;

    return (
        <Route
            { ...rest }
            render={ (props) =>
                !isAuthenticated ? (
                    <Redirect
                        to={ {
                            pathname: ROUTES.LOGIN,
                            state: { from: props.location },
                        } }
                    />
                )
                    : (
                        <Component { ...props } />
                    )
            }
        />
    );
};

export default PrivateRoute;
