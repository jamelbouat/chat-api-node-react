import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AccessUnauthorizedError from '../errors/AccessUnauthorizedError';
import AccessTokenMissingError from '../errors/AccessTokenMissingError';
import { IUserWithoutSensitiveData } from '../interfaces/user';

function UserAuthMiddleware() {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const authorization = req.headers.authorization;
        const accessToken = authorization && authorization.split(' ')[0] === 'Bearer' && authorization.split(' ')[1];
        const secretToken = process.env.ACCESS_TOKEN_SECRET as string;
        let verifiedAccessToken;

        if (!accessToken) {
            next(new AccessTokenMissingError());
            return;
        }

        try {
            verifiedAccessToken = jwt.verify(accessToken, secretToken) as { user: IUserWithoutSensitiveData };
        } catch (error) {
            next(new AccessUnauthorizedError());
            return;
        }
        req.user = verifiedAccessToken.user;
        next();
    };
}

export default UserAuthMiddleware;
