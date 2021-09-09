import { Socket } from 'socket.io';

import { getUserSockets } from './usersSockets';
import { addToRoomsList, isRoomExits } from './rooms';

export const joinChatRoom = (socket: Socket, room: string, userIds: string[]): void => {
    if (!isRoomExits(room)) {
        addToRoomsList(room);
    }

    userIds.forEach(userId => getUserSockets(userId) &&
        getUserSockets(userId).map(socket => socket.join(room)));
};
