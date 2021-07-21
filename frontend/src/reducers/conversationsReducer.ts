import {
    GET_CONVERSATIONS_REQUEST, GET_CONVERSATIONS_FAILURE,
    GET_CONVERSATIONS_SUCCESS, ADD_NEW_CONVERSATION_SUCCESS, REMOVE_CONVERSATION_SUCCESS, REMOVE_CONVERSATION_FAILURE, ADD_NEW_CONVERSATION_FAILURE
} from '../actions/types';
import { ALERT_TYPE } from '../constants';
import { IConversationsAction } from '../interfaces/actions';
import { IConversation } from '../interfaces/conversations';

const initialState = {
    isLoading: false,
    conversations: [],
    alertInfo: {
        alertType: null,
        alertMessage: null
    }
};

export const conversationsReducer = (state= initialState, action: IConversationsAction) => {
    switch (action.type) {
        case GET_CONVERSATIONS_REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case GET_CONVERSATIONS_SUCCESS:
            return {
                isLoading: false,
                conversations: action.payload.conversations,
                alertInfo: {
                    alertType: null,
                    alertMessage: null
                }
            };

        case GET_CONVERSATIONS_FAILURE:
            return {
                isLoading: false,
                conversations: [],
                alertInfo: {
                    alertType: ALERT_TYPE.ERROR,
                    alertMessage: action.payload.alertMessage
                }
            };

        case ADD_NEW_CONVERSATION_SUCCESS:
            return {
                ...state,
                conversations: [ ...state.conversations, action.payload.conversation]
            };

        case ADD_NEW_CONVERSATION_FAILURE:
            return {
                ...state,
                alertInfo: {
                    alertType: ALERT_TYPE.ERROR,
                    alertMessage: action.payload.alertMessage
                }
            };

        case REMOVE_CONVERSATION_SUCCESS:
            return {
                isLoading: false,
                conversations: [
                    ...state.conversations
                        .filter((conversation: IConversation) => conversation._id !== action.payload._id)
                ],
                alertInfo: {
                    alertType: ALERT_TYPE.INFO,
                    alertMessage: action.payload.alertMessage
                }
            };

        case REMOVE_CONVERSATION_FAILURE:
            return {
                ...state,
                alertInfo: {
                    alertType: ALERT_TYPE.ERROR,
                    alertMessage: action.payload.alertMessage
                }
            };

        default:
            return state;
    }
};
