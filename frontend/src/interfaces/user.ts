import { ITokens } from './tokens';

export interface IUser {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    online: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ILoginValues {
    email: string;
    password: string
}

export interface IRegisterValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string
}

export type ILoginResponseData = { user: IUser } & ITokens;
