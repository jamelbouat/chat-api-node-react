import { Action } from 'redux';
import React from 'react';
import { RouteComponentProps } from 'react-router';

import { ALERT_TYPE } from '../constants';
import { store } from '../index';

// State
export type RootState = ReturnType<typeof store.getState>;

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
    _id: string
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string
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

export type ILoginResponseData = { user: IUser } & ITokens;

// Actions
export interface ILoginAction extends Action {
    payload: { user: IUser } & IAlert;
}

export interface IRegisterAction extends Action {
    payload: IAlert;
}

export interface IUsersAction extends Action {
    payload: { users: IUser[] } & { alertMessage: string };
}

export interface IAlert {
    alertType: ALERT_TYPE,
    alertMessage: string
}

export interface ITokenAction extends Action {
    payload: ITokens & { promise: Promise<void> };
}

// Route
export interface IRoute {
    isAuthenticated: boolean;
    exact: boolean;
    path: string;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

// Fetch API
export type methodType = 'POST' | 'GET' | 'PUT' | 'DELETE';
