import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { ROUTES } from '../constants';

interface Props {
    isAuthenticated: boolean,
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>,
    rest: { exact: boolean, path: ROUTES }
}

const RestrictRoute: React.FC<Props> = (props) => {
    const { isAuthenticated, component: Component, ...rest } = props;

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Redirect
                        to={{
                            pathname: ROUTES.DASHBOARD,
                            state: { from: props.location },
                        }}
                    />
                )
                    : (
                        <Component {...props} />
                    )
            }
        />
    );
};

export default RestrictRoute;
