const apiUrl = process.env.REACT_APP_API_URL;

const requestOptions = () => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
});

const refreshTokens = async () => {
    try {
        const response = await fetch(`${apiUrl}/user/token`, requestOptions());
        return await response.json();
    } catch (error) {
        return error;
    }

};

export const refreshTokensService = {
    refreshTokens
};
