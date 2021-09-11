import { onNewConnection } from './newConnection';
import { joinChatRoom } from './joinChatRoom';
import { broadcastMessage } from './broadcastMessage';
import { removeSocketFromUserSocketsList } from './usersSockets';
import { IConversationService, IMessageService } from '../interfaces/services';
import { tryToSetUserOffline } from './onlineUsers';

export enum EVENTS {
    CHAT_MESSAGE = 'chat-message',
    JOIN_ROOM = 'join-chat-room',
    DISCONNECT = 'disconnect',
    ONLINE_USERS = 'online-users',
    OFFLINE_USERS = 'offline-users'
}

const listenToSocketEvents = (conversationService: IConversationService, messageService: IMessageService): void => {
    global.io.on('connection', socket => {
        onNewConnection(socket);

        socket.on(EVENTS.JOIN_ROOM, (room, userIds) => {
            joinChatRoom(socket, room, userIds);
        });

        socket.on(EVENTS.CHAT_MESSAGE, async (room, message) => {
            await broadcastMessage(socket, room, message, conversationService, messageService);
        });

        socket.on(EVENTS.DISCONNECT, () => {
            const userId = socket.data.userId;
            removeSocketFromUserSocketsList(socket);
            tryToSetUserOffline(userId) && socket.broadcast.emit(EVENTS.OFFLINE_USERS, [userId]);
            socket.disconnect();
        });
    });
};

export default listenToSocketEvents;
