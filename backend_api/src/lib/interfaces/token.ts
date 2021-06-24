
interface IAccessToken {
    token: string,
    expiresAt: number
}

interface ITokens {
    accessToken: IAccessToken
    refreshToken: string;
}

export { IAccessToken, ITokens };
