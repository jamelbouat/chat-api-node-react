import express from 'express';
import jwt from 'jsonwebtoken';
import AccessDeniedError from '../errors/AccessDeniedError';
import AuthenticationTokenMissingError from '../errors/AuthenticationTokenMissingError';
import IUserToken from '../interfaces/IUserToken';

function UserAuthMiddleware({ userModel }: any) {
    return async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        const authorization = req.headers.authorization;
        const token = authorization && authorization.split(' ')[0] === 'Bearer' && authorization.split(' ')[1];
        const secretToken = process.env.SECRET_TOKEN as string;

        try {
            if (!token) {
                throw new AuthenticationTokenMissingError();

            } else {
                const verifiedToken = jwt.verify(token, secretToken) as IUserToken;
                const user = await userModel.findById(verifiedToken._id);

                if(user && req.body.user._id && req.body.user._id == verifiedToken._id) {
                    req.user = user;
                    next();
                } else {
                    throw new AccessDeniedError();
                }
            }
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    };
}

export default UserAuthMiddleware;
