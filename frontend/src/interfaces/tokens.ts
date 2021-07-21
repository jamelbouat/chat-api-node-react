
export interface IAccessToken {
    token: string | null;
    expiresAt: number | null
}

export interface ITokens {
    accessToken: IAccessToken;
    refreshToken: string | null
}
