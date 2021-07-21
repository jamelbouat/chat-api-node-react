import { Request, Response, NextFunction } from 'express';

import RefreshTokenMissingError from '../errors/RefreshTokenMissingError';
import AccessForbiddenError from '../errors/AccessForbiddenError';
import { IUser } from '../interfaces/user';
import AccessUnauthorizedError from '../errors/AccessUnauthorizedError';
import { IUserService } from '../interfaces/services';
import { verifyRefreshTokenValidation } from '../utils/token';

function IsUserRefreshTokenValid({ userService }: { userService: IUserService }) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const refreshToken = req.body.refreshToken;
        let verifiedRefreshToken;

        if (!refreshToken) {
            next(new RefreshTokenMissingError());
            return;
        }

        try {
            verifiedRefreshToken = verifyRefreshTokenValidation(refreshToken);
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
