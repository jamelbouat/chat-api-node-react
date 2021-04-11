import express from 'express';
import jwt from 'jsonwebtoken';
import AccessDeniedError from '../errors/AccessDeniedError';
import AuthTokenMissingError from '../errors/AuthTokenMissingError';
import IUserToken from '../interfaces/IUserToken';

function UserAuthMiddleware() {
    return async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        const authorization = req.headers.authorization;
        const token = authorization && authorization.split(' ')[0] === 'Bearer' && authorization.split(' ')[1];
        const secretToken = process.env.ACCESS_TOKEN_SECRET as string;

        try {
            if (!token) {
                throw new AuthTokenMissingError();

            } else {
                const verifiedAccessToken = jwt.verify(token, secretToken) as IUserToken;
                if(verifiedAccessToken) {
                    req.user = verifiedAccessToken.user;
                    next();
                } else {
                    throw new AccessDeniedError();
                }
            }
        } catch (err) {
            const error = err.status ? err : new AccessDeniedError();
            res.status(error.status).json({ message: error.message });
        }
    };
}

export default UserAuthMiddleware;
