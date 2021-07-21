import { Action } from 'redux';

import {
    JOIN_CONVERSATION, LEAVE_CONVERSATION, RECEIVE_MESSAGE,
    SEND_MESSAGE_FAILURE, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS
} from '../actions/types';

const initialState = {
    isLoading: false,
    _id: null,
    userIds:[],
    messages: [],
    alertInfo: {
        alertType: null,
        alertMessage: null
    }
};

export const conversationReducer = (state= initialState, action: Action) => {
    switch (action.type) {
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

        case RECEIVE_MESSAGE:
            return state;

        default:
            return state;
    }
};
