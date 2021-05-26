import { Action } from 'redux';

export interface IUser {
    user: {
        _id: string
        email: string;
        firstName: string;
        lastName: string;
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

export interface IUserAction extends Action {
    payload: IUser;
}

export interface IAccessToken {
    token: string | null,
    expiresAt: number | null
}

export interface ITokens {
    accessToken: IAccessToken
    refreshToken: string | null;
}

export type ILoginResponseData = IUser & ITokens;


