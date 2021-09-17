import {
    GET_CONVERSATIONS_REQUEST,
    GET_CONVERSATIONS_FAILURE,
    GET_CONVERSATIONS_SUCCESS,
    ADD_NEW_CONVERSATION_SUCCESS,
    REMOVE_CONVERSATION_SUCCESS,
    REMOVE_CONVERSATION_FAILURE,
    ADD_NEW_CONVERSATION_FAILURE,
    REMOVE_CONVERSATIONS_FROM_STORE, ON_RECEIVED_MESSAGE, CLEAR_LOGIN_ALERT, CLEAR_CONVERSATIONS_ALERT,
} from '../actions/types';
import { ALERT_TYPE } from '../constants';
import { IConversationsAction } from '../interfaces/actions';
import { IConversation, IReceivedMessage } from '../interfaces/conversations';

const initialState = {
    isLoading: false,
    conversations: [],
    alertInfo: {
        alertType: null,
        alertMessage: null
    }
};

function addNewMessage(conversations: IConversation[], message: IReceivedMessage | undefined): IConversation[] {
    if (!message) {
        return conversations;
    }
    return conversations.reduce((arr: IConversation[], conversation: IConversation) => {
        if (conversation._id === message.conversationId) {
            arr.unshift({ ...conversation, messages: [ ...conversation.messages, message ] });
            return arr;
        }
        arr.push(conversation);
        return arr;
    }, []);
}

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

        case ON_RECEIVED_MESSAGE:
            return {
                ...state,
                conversations: addNewMessage(state.conversations, action.payload.message)
            };

        case ADD_NEW_CONVERSATION_SUCCESS:
            return {
                ...state,
                conversations: [ action.payload.conversation, ...state.conversations ]
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
                    ...state
                        .conversations
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

        case REMOVE_CONVERSATIONS_FROM_STORE:
            return {
                ...initialState
            };

        case CLEAR_CONVERSATIONS_ALERT:
            return {
                ...state,
                alertInfo: {
                    alertType: null,
                    alertMessage: null
                }
            };

        default:
            return state;
    }
};
