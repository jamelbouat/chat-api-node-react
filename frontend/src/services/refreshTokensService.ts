import { fetchApi } from './fetchApi';

const requestOptions = () => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
});

const refreshTokens = async () => {
    try {
        const response = await fetchApi('user/token', requestOptions());
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const refreshTokensService = {
    refreshTokens
};
