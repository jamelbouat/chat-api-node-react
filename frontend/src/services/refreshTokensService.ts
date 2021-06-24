import { fetchApi } from './fetchApi';
import { ITokens } from '../interfaces';

const tokenPathname = process.env.REACT_APP_API_TOKEN_USER || '';
const stringifyBody = (refreshToken: string) => JSON.stringify({ refreshToken });

const refreshTokens = async (refreshToken: string): Promise<ITokens>  => {
    try {
        return await fetchApi(tokenPathname, 'POST', undefined, stringifyBody(refreshToken));
    } catch (error) {
        throw error;
    }
};

export const refreshTokensService = {
    refreshTokens
};
