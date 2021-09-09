import CryptoJS from 'crypto-js';
import { RootState } from '../interfaces/state';

// import { ITokens, IAccessToken } from '../interfaces';

const secretKey = process.env.REACT_APP_API_SECRET_KEY as string;

export const getStateFromSessionStorage = (): RootState => {
    try {
        const encryptedState = sessionStorage.getItem('state');
        if (encryptedState === null) {
            return undefined;
        }
        return decryptState(encryptedState);
    } catch(e) {
        return undefined;
    }
};

export const saveStateToSessionStorage = (state: RootState): void => {
    try {
        const encryptedState = encryptState(state);
        sessionStorage.setItem('state', encryptedState);
    } catch(e) {
        console.log(e);
    }
};

export const removeStateFromStorage = (): void => {
    sessionStorage.removeItem('state');
};

const encryptState = (state: RootState) => {
    return CryptoJS.AES
        .encrypt(JSON.stringify(state), secretKey)
        .toString();
};

const decryptState = (encryptedState: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedState, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
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
