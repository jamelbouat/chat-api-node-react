import { Socket } from 'socket.io';
import { verifyAccessTokenValidation } from '../utils/token';
import { addToUserSocketsList } from './usersSockets';

export const newConnection = (socket: Socket): void => {
    const accessToken = socket.handshake.query.token as string;
    if (!accessToken) {
        console.log('Missing access token');
    }

    const verifiedConnectedUser = verifyAccessTokenValidation(accessToken);
    if (!verifiedConnectedUser) {
        console.log('User unauthorized to connect');
    }

    const userId = verifiedConnectedUser.user._id;
    socket.data.userId = userId ;
    addToUserSocketsList(userId, socket);
};
