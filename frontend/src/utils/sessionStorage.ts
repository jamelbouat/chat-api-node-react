import { RootState } from '../../typings/redux';
// import { ITokens, IAccessToken } from '../interfaces';

export const getStateFromSessionStorage = (): RootState => {
    try {
        const serializedState = sessionStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch(e) {
        return undefined;
    }
};

export const saveStateToSessionStorage = (state: RootState): void => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem('state', serializedState);
    } catch(e) {
    }
};

// export const saveTokensToStorage = (tokens: ITokens): void => {
//     setAccessToken(tokens.accessToken);
//     setRefreshToken(tokens.refreshToken);
// };
//
// export const getTokensFromStorage = (): ITokens => {
//     const accessToken = getAccessToken();
//     const refreshToken = getRefreshToken();
//     return { accessToken, refreshToken };
// };
//
// export const getAccessToken = (): IAccessToken => {
//     const accessToken = localStorage.getItem('accessToken');
//     if (accessToken) {
//         return JSON.parse(accessToken);
//     }
//     return { token: null, expiresAt: null };
// };

// export const getRefreshToken = (): string | null => {
//     const refreshToken = localStorage.getItem('refreshToken');
//     if (refreshToken) {
//         return JSON.parse(refreshToken);
//     }
//     return refreshToken || null;
// };
//
// export const setAccessToken = (accessToken: IAccessToken): void => {
//     localStorage.setItem('accessToken', JSON.stringify(accessToken));
// };
//
// export const setRefreshToken = (refreshToken: string | null): void => {
//     localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
// };

// export const removeTokens = (): void => {
//     removeAccessToken();
//     removeRefreshToken();
// };
//
// export const removeAccessToken = (): void => {
//     localStorage.removeItem('accessToken');
// };
//
// export const removeRefreshToken = (): void => {
//     localStorage.removeItem('refreshToken');
// };
