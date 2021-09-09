import jwt from 'jsonwebtoken';

import { IUser, IUserWithoutSensitiveData } from '../interfaces/user';
import { IAccessToken, ITokens } from '../interfaces/token';
import { IObject, removePropertiesFromCurrentObject } from './objects';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;
const accessTokenExpiresIn = 300000; // seconds
const refreshTokenExpiresIn = 600000; // seconds

const getNewJwtToken = (payload: IObject, secret: string, expiresIn: number): string => {
    return jwt.sign({ user: payload }, secret, { expiresIn });
};

const removeSensitiveDataFromUser = (user: IUser): IUserWithoutSensitiveData => {
    const configurableUser = user.toObject();
    return removePropertiesFromCurrentObject(configurableUser, 'password', '__v', 'refreshTokens') as IUserWithoutSensitiveData;
};

const generateNewAccessToken = (userWithoutSensitiveData: IUserWithoutSensitiveData): IAccessToken => {
    const expiresAt = Date.now() + accessTokenExpiresIn * 1000; // expiresAt in ms
    const newAccessToken = getNewJwtToken(userWithoutSensitiveData, accessTokenSecret, accessTokenExpiresIn);
    return { token: newAccessToken, expiresAt };
};

const generateNewRefreshToken = (userWithoutSensitiveData: IUserWithoutSensitiveData): string => {
    return getNewJwtToken(userWithoutSensitiveData, refreshTokenSecret, refreshTokenExpiresIn);
};

const generateAccessAndRefreshTokens = (user: IUser): ITokens => {
    const userWithoutSensitiveData = removeSensitiveDataFromUser(user);
    const accessToken = generateNewAccessToken(userWithoutSensitiveData);
    const refreshToken = generateNewRefreshToken(userWithoutSensitiveData);

    return { accessToken, refreshToken };
};

const verifyAccessTokenValidation = (accessToken: string): { user: IUserWithoutSensitiveData } => {
    return jwt.verify(accessToken, accessTokenSecret) as { user: IUserWithoutSensitiveData };
};

const verifyRefreshTokenValidation = (refreshToken: string): { user: IUserWithoutSensitiveData } => {
    return jwt.verify(refreshToken, refreshTokenSecret) as { user: IUserWithoutSensitiveData };
};

export {
    removeSensitiveDataFromUser,
    generateAccessAndRefreshTokens,
    verifyAccessTokenValidation,
    verifyRefreshTokenValidation
};


