import { io, Socket } from 'socket.io-client';

import { IMessage, ISendMessage } from '../../interfaces/conversations';
import { Dispatch } from 'redux';

const api_url = process.env.REACT_APP_API_URL as string;

enum EVENTS {
    CHAT_MESSAGE = 'chat-message',
    JOIN_ROOM = 'join-chat-room',
    CONNECT = 'connect',
    ONLINE_USERS = 'online-users',
    OFFLINE_USERS = 'offline-users'
}

class SocketService {
    socket: Socket;
    public accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
        this.socket = io(api_url, { query: { token: this.accessToken } });
    }

    public listenToReceivedMessage(dispatch: Dispatch, onReceiveMessage: (message: IMessage) => any): void {
        this.socket.on(EVENTS.CHAT_MESSAGE, message => dispatch(onReceiveMessage(message)));
    }

    public sendMessage(message: ISendMessage): void {
        this.socket.emit(EVENTS.CHAT_MESSAGE, message.conversationId, message);
    }

    public joinConversationRoom(room: string, userIds: string[]): void {
        this.socket.emit(EVENTS.JOIN_ROOM, room, userIds);
    }

    public setNewSocketConnection(dispatch: Dispatch, onNewSocketConnection: (socketId: string) => any): void {
        this.socket.on(EVENTS.CONNECT, () => {
            dispatch(onNewSocketConnection(this.socket.id));
        });
    }

    public listenToUsersStatusChangeOnline(dispatch: Dispatch, onSetUsersOnline: (userIds: string[]) => any): void {
        this.socket.on(EVENTS.ONLINE_USERS, userIds => dispatch(onSetUsersOnline(userIds)));
    }

    public listenToUsersStatusChangeOffline(dispatch: Dispatch, onSetUsersOffline: (userIds: string[]) => any): void {
        this.socket.on(EVENTS.OFFLINE_USERS, userIds => dispatch(onSetUsersOffline(userIds)));
    }

    public disconnect(): void {
        this.socket.close();
    }

    public getSocketService(): SocketService {
        return this;
    }
}

export default SocketService;
