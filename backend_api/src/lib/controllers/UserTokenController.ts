import express, { Router } from 'express';

import { GET_NEW_USER_TOKEN_URL } from '../../config/url.config';

class UserTokenController {
    private userTokenService: any;
    private router;
    private isUserRefreshTokenValid;

    constructor(
        { userTokenService, isUserRefreshTokenValid }:
            { userTokenService: any, isUserRefreshTokenValid: any }
    ) {
        this.userTokenService = userTokenService;
        this.router = Router();
        this.isUserRefreshTokenValid = isUserRefreshTokenValid;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(GET_NEW_USER_TOKEN_URL, this.isUserRefreshTokenValid, this.getNewUserTokens);
    }

    private getNewUserTokens = async (req: express.Request, res: express.Response) => {
        try {
            const user = req.user;
            const refreshToken = req.refreshToken as string;
            const newTokens = await this.userTokenService.getNewUserTokens(user, refreshToken);
            res.status(200).json({ ...newTokens });
        } catch(err) {
            const status = err.status ? err.status : '401';
            res.status(status).json({ message: err.message });
        }
    }
}

export default UserTokenController;
