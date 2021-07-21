import { Socket } from 'socket.io';
import { verifyAccessTokenValidation } from '../utils/token';
import { addToSocketUsersList } from './usersSockets';
import AccessTokenMissingError from '../errors/AccessTokenMissingError';
import AccessUnauthorizedError from '../errors/AccessUnauthorizedError';

export const newConnection = (socket: Socket): void => {
    const accessToken = socket.handshake.query.token as string;
    if (!accessToken) {
        throw new AccessTokenMissingError();
    }

    const verifiedConnectedUser = verifyAccessTokenValidation(accessToken);
    if (!verifiedConnectedUser) {
        throw new AccessUnauthorizedError;
    }

    const userId = verifiedConnectedUser.user._id;
    addToSocketUsersList(userId, socket);
};
