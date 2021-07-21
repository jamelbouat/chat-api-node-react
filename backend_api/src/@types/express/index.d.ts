import { Server } from 'socket.io';
import IUser from '../../lib/interfaces/IUser';

declare global {
    namespace NodeJS {
        interface Global {
            io: Server
        }
    }
    namespace Express {
        interface Request {
            user: IUser
            refreshToken: refreshToken
        }
    }
}
