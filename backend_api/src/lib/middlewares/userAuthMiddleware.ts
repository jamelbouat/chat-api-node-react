import { Request, Response, NextFunction } from 'express';
import AccessUnauthorizedError from '../errors/AccessUnauthorizedError';
import AccessTokenMissingError from '../errors/AccessTokenMissingError';
import { verifyAccessTokenValidation } from '../utils/token';

function UserAuthMiddleware() {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const authorization = req.headers.authorization;
        const accessToken = authorization && authorization.split(' ')[0] === 'Bearer' && authorization.split(' ')[1];
        let verifiedAccessToken;

        if (!accessToken) {
            next(new AccessTokenMissingError());
            return;
        }

        try {
            verifiedAccessToken = verifyAccessTokenValidation(accessToken) ;
        } catch (error) {
            next(new AccessUnauthorizedError());
            return;
        }
        req.user = verifiedAccessToken.user;
        next();
    };
}

export default UserAuthMiddleware;
