import { newConnection } from './newConnection';
import { joinChatRoom } from './joinChatRoom';
import { broadcastMessage } from './broadcastMessage';

const listenToSocketEvents = (): void => {
    global.io.on('connection', socket => {
        newConnection(socket);

        socket.on('join-chat-room', (room, userIds) => {
            joinChatRoom(socket, room, userIds);
        });

        socket.on('chat-message', (room, message) => {
            broadcastMessage(socket, room, message);
        });

    });

};

export default listenToSocketEvents;
