import IUser from '../../lib/interfaces/IUser';

declare global {
    namespace Express {
        interface Request {
            user: IUser
            refreshToken: refreshToken
        }
    }
}
