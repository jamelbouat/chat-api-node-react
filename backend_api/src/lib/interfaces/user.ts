import { Document } from 'mongoose';

import { IAccessToken } from './token';

interface IUser extends Document {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    refreshTokens: string[];
    createdAt: string;
    updatedAt: string;
}

interface IUserWithoutSensitiveData {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt?: string;
    updatedAt?: string;
}

interface IUserRegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface IUserUpdateData {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    refreshTokens?: string[];
}

interface IUserLoginData {
    email: string;
    password: string;
}

interface IUserLoginResponseData {
    user: IUserWithoutSensitiveData;
    accessToken: IAccessToken
    refreshToken: string;
}

export { IUser, IUserRegisterData, IUserLoginData, IUserUpdateData, IUserLoginResponseData, IUserWithoutSensitiveData };
