import { NextFunction, Request, Response, Router } from 'express';

import { GET_NEW_USER_TOKEN_URL } from '../../config/url.config';
import AccessForbiddenError from '../errors/AccessForbiddenError';

class UserTokenController {
    private userTokenService: any;
    private router: Router;
    private isUserRefreshTokenValid: () => Promise<void>;

    constructor({ userTokenService, isUserRefreshTokenValid }:
            {
                userTokenService: any,
                isUserRefreshTokenValid: () => Promise<void>
            })
    {
        this.userTokenService = userTokenService;
        this.router = Router();
        this.isUserRefreshTokenValid = isUserRefreshTokenValid;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(GET_NEW_USER_TOKEN_URL, this.isUserRefreshTokenValid, this.getNewUserTokens);
    }

    private getNewUserTokens = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = req.user;
            const oldRefreshToken = req.refreshToken as string;
            const newTokens = await this.userTokenService.getNewUserTokens(user, oldRefreshToken);
            res.status(200).json({ ...newTokens });
        } catch(err) {
            next(new AccessForbiddenError());
        }
    }
}

export default UserTokenController;
