import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { ROUTES } from '../constants';
import { IRoute } from '../interfaces';

const RestrictRoute: React.FC<IRoute> = (props) => {
    const { isAuthenticated, component: Component, ...rest } = props;

    return (
        <Route
            { ...rest }
            render={ (props) =>
                isAuthenticated ? (
                    <Redirect
                        to={ {
                            pathname: ROUTES.DASHBOARD,
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

export default RestrictRoute;
