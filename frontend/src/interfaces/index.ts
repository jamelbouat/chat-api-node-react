import { Action } from 'redux';
import React from 'react';
import { RouteComponentProps } from 'react-router';

import { ALERT_TYPE } from '../constants';

// Tokens
export interface IAccessToken {
    token: string | null,
    expiresAt: number | null
}

export interface ITokens {
    accessToken: IAccessToken
    refreshToken: string | null;
}


// authentication
export interface IUser {
    user: {
        _id: string
        email: string;
        firstName: string;
        lastName: string;
        createdAt: string;
        updatedAt: string
    }
}

export interface ILoginValues {
    email: string;
    password: string;
}

export interface IRegisterValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type ILoginResponseData = IUser & ITokens;


// Actions
export interface ILoginAction extends Action {
    payload: IUser & { alertMessage: string };
}

export interface IRegisterAction extends Action {
    payload: { alertMessage: string };
}

export interface IAlert {
    alertType: ALERT_TYPE,
    alertMessage: string
}

// export interface IAlertAction extends Action {
//     payload: IAlert
// }

export interface ITokenAction extends Action {
    payload: ITokens & Promise<void>;
}


// Route
export interface IRoute {
    isAuthenticated: boolean;
    exact: boolean;
    path: string;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}
