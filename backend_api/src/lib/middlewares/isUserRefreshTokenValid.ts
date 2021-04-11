import express from 'express';
import jwt from 'jsonwebtoken';
import AccessDeniedError from '../errors/AccessDeniedError';
import IUserToken from '../interfaces/IUserToken';
import RefreshTokenMissingError from '../errors/RefreshTokenMissingError';
import AccessForbiddenError from '../errors/AccessForbiddenError';

function IsUserRefreshTokenValid({ userModel }: { userModel: any}) {
    return async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;
        const refreshToken = req.body.refreshToken;

        try {
            if(!refreshToken) {
                throw new RefreshTokenMissingError();
            }

            const verifiedRefreshToken = jwt.verify(refreshToken, refreshTokenSecret) as IUserToken;

            // Check if the refreshTokens array includes the received one
            const user = await userModel.findById(verifiedRefreshToken.user._id);
            if(!user || user.refreshTokens && !user.refreshTokens.includes(refreshToken)) {
                throw new AccessForbiddenError();
            }
            console.log(refreshToken);
            req.user = user;
            req.refreshToken = refreshToken;
            next();

        } catch (err) {
            const error = err.status ? err : new AccessDeniedError();
            res.status(error.status).json({ message: error.message });
        }

    };
}

export default IsUserRefreshTokenValid;
