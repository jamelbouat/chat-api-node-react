import { Socket } from 'socket.io';

import { getUserSocket } from './usersSockets';
import { addToRoomsList, isRoomExits } from './rooms';

export const joinChatRoom = (socket: Socket, room: string, userIds: string[]): void => {
    if (isRoomExits(room)) {
        return;
    }

    socket.join(room);
    userIds.forEach(userId => getUserSocket(userId).join(room));
    addToRoomsList(room);
};
