import { Socket } from 'socket.io';

import { verifyAccessTokenValidation } from '../utils/token';
import { addSocketToUserSocketsList } from './usersSockets';
import { addUserToOnlineUsersList, getOnlineUsersList, isUserAlreadyOnline } from './onlineUsers';
import { EVENTS } from './index';

export const onNewConnection = (socket: Socket): void => {
    const accessToken = socket.handshake.query.token as string;
    if (!accessToken) {
        console.log('Missing access token');
        return;
    }

    const verifiedConnectedUser = verifyAccessTokenValidation(accessToken);
    if (!verifiedConnectedUser) {
        console.log('User unauthorized to connect');
        return;
    }

    const userId = verifiedConnectedUser.user._id;
    socket.data.userId = userId ;
    addSocketToUserSocketsList(userId, socket);

    if (!isUserAlreadyOnline(userId)) {
        addUserToOnlineUsersList(userId);
        emitNewOnlineUser(socket, userId);
    }

    emitOnlineUsersToCurrentSocket(socket);
};

const emitNewOnlineUser = (socket: Socket, userId: string) => {
    socket.broadcast.emit(EVENTS.ONLINE_USERS, [userId]);
};

const emitOnlineUsersToCurrentSocket = (socket: Socket) => {
    socket.emit(EVENTS.ONLINE_USERS, getOnlineUsersList());
};
