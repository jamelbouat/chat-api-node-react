import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import RefreshTokenMissingError from '../errors/RefreshTokenMissingError';
import AccessForbiddenError from '../errors/AccessForbiddenError';
import { IUser, IUserWithoutSensitiveData } from '../interfaces/user';
import AccessUnauthorizedError from '../errors/AccessUnauthorizedError';
import { IUserService } from '../interfaces/service';

function IsUserRefreshTokenValid({ userService }: { userService: IUserService }) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;
        const refreshToken = req.body.refreshToken;
        let verifiedRefreshToken;

        if (!refreshToken) {
            next(new RefreshTokenMissingError());
            return;
        }

        try {
            verifiedRefreshToken = jwt.verify(refreshToken, refreshTokenSecret) as { user: IUserWithoutSensitiveData };
        } catch (error) {
            next(new AccessUnauthorizedError());
            return;
        }

        // Check if the refreshTokens array includes the received refresh token
        const user = await userService.getElementWithSensitiveData(verifiedRefreshToken.user._id) as IUser;
        if (!user || user.refreshTokens && !user.refreshTokens.includes(refreshToken)) {
            next(new AccessForbiddenError());
            return;
        }

        req.user = user;
        req.refreshToken = refreshToken;
        next();
    };
}

export default IsUserRefreshTokenValid;
