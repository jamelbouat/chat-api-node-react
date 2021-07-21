import { NextFunction, Request, Response, Router } from 'express';

import { GET_NEW_USER_TOKEN_URL } from '../../config/url.config';
import AccessForbiddenError from '../errors/AccessForbiddenError';
import { IController } from '../interfaces/controllers';
import { IUserTokenService } from '../interfaces/services';

class UserTokenController implements IController {
    public router: Router;
    private service: IUserTokenService;
    private isUserRefreshTokenValid: () => Promise<void>;

    constructor({ userTokenService, isUserRefreshTokenValid }:
            {
                userTokenService: IUserTokenService,
                isUserRefreshTokenValid: () => Promise<void>
            })
    {
        this.router = Router();
        this.service = userTokenService;
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
            const newTokens = await this.service.getNewUserTokens(user, oldRefreshToken);
            res.status(200).json({ ...newTokens });
        } catch(err) {
            next(new AccessForbiddenError());
        }
    }
}

export default UserTokenController;
