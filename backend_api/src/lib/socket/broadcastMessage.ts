import { Socket } from 'socket.io';

import { IMessage } from '../interfaces/conversation';

export const broadcastMessage = (socket: Socket, room: string, message: IMessage): void => {
    socket.to(room).emit('chat-message', message);
};
