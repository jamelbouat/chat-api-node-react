import { Dispatch } from 'redux';

import { RECEIVE_MESSAGE } from './types';
import SocketService from '../services/socket';
import { IMessage } from '../interfaces/conversations';

const sendMessage = () => (dispatch: Dispatch) => {

};

const onReceiveMessage = (message: IMessage) => (dispatch: Dispatch) => {
    dispatch({
        type: RECEIVE_MESSAGE,
        payload: {
            message
        }
    });
};

const socket = new SocketService();
socket.listenToReceivedMessage(onReceiveMessage);

export { sendMessage, onReceiveMessage };


