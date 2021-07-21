import { io, Socket } from 'socket.io-client';
import { IMessage } from '../../interfaces/conversations';

const api_url = process.env.REACT_APP_API_URL as string;

enum EVENTS {
    CHAT_MESSAGE = 'chat-message',
    JOIN_ROOM = 'join-chat-room',
    DISCONNECT = 'disconnect',
}

class SocketService {
    private socket: Socket;

    constructor() {
        this.socket = io(api_url);
    }

    public listenToReceivedMessage = (onReceiveMessage: (message: IMessage) => void): void => {
        this.socket.on(EVENTS.CHAT_MESSAGE, onReceiveMessage);
    };

    public sendMessage = (message: IMessage): void => {
        this.socket.emit(EVENTS.CHAT_MESSAGE, message);
    };

    public joinChatRoom = (room: string, userIds: string[]): void => {
        this.socket.emit(EVENTS.JOIN_ROOM, room, userIds);
    }

    public disconnect = (): void => {
        this.socket.close();
    };
}

export default SocketService;
