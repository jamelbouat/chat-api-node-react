import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { ROUTES } from '../constants';

interface Props {
    isAuthenticated: boolean,
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>,
    rest: {
        exact: boolean,
        path: string
    }
}

const PrivateRoute: React.FC<Props> = (props) => {
    const { isAuthenticated, component: Component, ...rest } = props;

    return (
        <Route
            { ...rest }
            render={ (props) =>
                !isAuthenticated ? (
                    <Redirect
                        to={{
                            pathname: ROUTES.LOGIN,
                            state: { from: props.location },
                        }}
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
