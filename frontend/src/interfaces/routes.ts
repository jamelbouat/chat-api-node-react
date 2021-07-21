import React from 'react';
import { RouteComponentProps } from 'react-router';

export interface IRoute {
    isAuthenticated: boolean;
    exact: boolean;
    path: string;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
}
