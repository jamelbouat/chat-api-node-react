import { newConnection } from './newConnection';
import { joinChatRoom } from './joinChatRoom';
import { broadcastMessage } from './broadcastMessage';
import { removeFromUserSocketsList } from './usersSockets';
import { IConversationService, IMessageService } from '../interfaces/services';

enum EVENTS {
    CHAT_MESSAGE = 'chat-message',
    JOIN_ROOM = 'join-chat-room',
    DISCONNECT = 'disconnect',
}

const listenToSocketEvents = (conversationService: IConversationService, messageService: IMessageService): void => {
    global.io.on('connection', socket => {
        newConnection(socket);

        socket.on(EVENTS.JOIN_ROOM, (room, userIds) => {
            joinChatRoom(socket, room, userIds);
        });

        socket.on(EVENTS.CHAT_MESSAGE, async (room, message) => {
            await broadcastMessage(socket, room, message, conversationService, messageService);
        });

        socket.on(EVENTS.DISCONNECT, () => {
            removeFromUserSocketsList(socket);
            socket.disconnect();
        });
    });
};

export default listenToSocketEvents;
