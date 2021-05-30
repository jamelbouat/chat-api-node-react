import { fetchApi } from './fetchApi';

const tokenPathname = process.env.REACT_APP_API_TOKEN_USER || '';

const requestOptions = () => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
});

const refreshTokens = async () => {
    try {
        const response = await fetchApi(tokenPathname, requestOptions());
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const refreshTokensService = {
    refreshTokens
};
