import { Action, Dispatch } from 'redux';

import {
    ON_RECEIVED_MESSAGE,
    REMOVE_SOCKET_CONNECTION,
    ON_SOCKET_CONNECTION,
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS, GET_MESSAGES_FAILURE
} from './types';
import { IConversation, IMessage } from '../interfaces/conversations';
import { RootState } from '../interfaces/state';
import { getAccessToken } from '../utils/tokens';
import { isUserAuthenticated } from '../utils/user';
import SocketService from '../services/socket';
import { store } from '../index';
import { messagesService } from '../services/messagesService';
import { onSetUsersOffline, onSetUsersOnline } from './users';

let socketService: SocketService;

const createNewSocketService = () => {
    socketService = new SocketService(getAccessToken());
    socketService.setNewSocketConnection(store.dispatch, onNewSocketConnection);
    socketService.listenToReceivedMessage(store.dispatch, onReceiveMessage);
    socketService.listenToUsersStatusChangeOnline(store.dispatch, onSetUsersOnline);
    socketService.listenToUsersStatusChangeOffline(store.dispatch, onSetUsersOffline);
};

const connectToSocketService = (): void => {
    const socketId = store.getState().messagesState.socketId;
    if (!socketId) {
        createNewSocketService();
    }
};

window.addEventListener('load', () => {
    if (isUserAuthenticated()) {
        createNewSocketService();
    }
});

const joinConversationRoom = (currentConversation: IConversation): void => {
    const userIds = currentConversation.users.map(user => user._id);
    socketService && socketService.joinConversationRoom(currentConversation._id, userIds);
};

const sendMessage = (message: { content: string, conversationId: string }) =>
    (dispatch: Dispatch, getState: RootState) => {
        const from = getState().loginState.user._id;
        socketService && socketService.sendMessage({ ...message, from });
    };

const removeSocketConnection = (): Action => {
    socketService.disconnect();
    return {
        type: REMOVE_SOCKET_CONNECTION
    };
};

const onNewSocketConnection = (socketId: string) => ({
    type: ON_SOCKET_CONNECTION,
    payload: {
        socketId
    }
});

const onReceiveMessage = (message: IMessage) => ({
    type: ON_RECEIVED_MESSAGE,
    payload: {
        message
    }
});

const getConversationMessages = (conversationId: string) => async (dispatch: Dispatch) => {
    dispatch(getMessagesRequest());
    try {
        const messages = await messagesService.getConversationMessages(conversationId);
        dispatch(getMessagesSuccess(messages));
    } catch(error) {
        dispatch(getMessagesFailure(error.message));
    }
};

const getMessagesRequest = () => ({
    type: GET_MESSAGES_REQUEST
});

const getMessagesSuccess = (messages: IMessage[]) => ({
    type: GET_MESSAGES_SUCCESS,
    payload: {
        messages
    }
});

const getMessagesFailure = (errorMessage: string) => ({
    type: GET_MESSAGES_FAILURE,
    payload: {
        alertMessage: errorMessage
    }
});

export {
    connectToSocketService,
    joinConversationRoom,
    sendMessage,
    onReceiveMessage,
    removeSocketConnection,
    getConversationMessages
};


