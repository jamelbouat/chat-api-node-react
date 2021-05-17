import { ITokens, IAccessToken } from '../interfaces';

export const saveTokensToStorage = (tokens: ITokens): void => {
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
};

export const getTokensFromStorage = (): ITokens => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    return { accessToken, refreshToken };
};

export const getAccessToken = (): IAccessToken => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        return JSON.parse(accessToken);
    }
    return { token: '', expiresAt: '' };
};

export const getRefreshToken = (): string => {
    return localStorage.getItem('refreshToken') || '';
};

export const setAccessToken = (accessToken: IAccessToken): void => {
    localStorage.setItem('accessToken', JSON.stringify(accessToken));
};

export const setRefreshToken = (refreshToken: string): void => {
    localStorage.setItem('refreshToken', refreshToken);
};

export const removeTokens = (): void => {
    removeAccessToken();
    removeRefreshToken();
};

export const removeAccessToken = (): void => {
    localStorage.removeItem('accessToken');
};

export const removeRefreshToken = (): void => {
    localStorage.removeItem('RefreshToken');
};
