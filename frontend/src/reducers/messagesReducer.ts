import {
    JOIN_CONVERSATION,
    LEAVE_CONVERSATION,
    ON_RECEIVED_MESSAGE,
    REMOVE_SOCKET_CONNECTION,
    SEND_MESSAGE_FAILURE,
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    ON_SOCKET_CONNECTION,
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS, GET_MESSAGES_FAILURE
} from '../actions/types';
import { IMessagesAction } from '../interfaces/actions';
import { ALERT_TYPE } from '../constants';

const initialState = {
    socketId: null,
    isLoading: false,
    // messages: [],
    alertInfo: {
        alertType: null,
        alertMessage: null
    }
};

export const messagesReducer = (state= initialState, action: IMessagesAction) => {
    switch (action.type) {
        case ON_SOCKET_CONNECTION:
            return {
                ...state,
                socketId: action.payload.socketId
            };

        case REMOVE_SOCKET_CONNECTION:
            return {
                ...initialState
            };

            // case GET_MESSAGES_REQUEST:
            //     return {
            //         ...state,
            //         isLoading: true,
            //     };
            //
            // case GET_MESSAGES_SUCCESS:
            //     return {
            //         ...state,
            //         isLoading: false,
            //         messages: [ ...state.messages, ...action.payload.messages ],
            //         alertInfo: {
            //             alertType: null,
            //             alertMessage: null
            //         }
            //     };
            //
            // case GET_MESSAGES_FAILURE:
            //     return {
            //         ...state,
            //         isLoading: false,
            //         alertInfo: {
            //             alertType: ALERT_TYPE.ERROR,
            //             alertMessage: action.payload.alertMessage
            //         }
            //     };



        case JOIN_CONVERSATION:
            return state;

        case LEAVE_CONVERSATION:
            return state;

        case SEND_MESSAGE_REQUEST:
            return state;

        case SEND_MESSAGE_SUCCESS:
            return state;

        case SEND_MESSAGE_FAILURE:
            return state;

        default:
            return state;
    }
};
