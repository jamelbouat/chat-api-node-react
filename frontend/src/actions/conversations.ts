import { Action, Dispatch } from 'redux';

import {
    ADD_NEW_CONVERSATION_FAILURE, ADD_NEW_CONVERSATION_SUCCESS,
    GET_CONVERSATIONS_FAILURE,
    GET_CONVERSATIONS_REQUEST,
    GET_CONVERSATIONS_SUCCESS, REMOVE_CONVERSATION_FAILURE, REMOVE_CONVERSATION_SUCCESS
} from './types';
import { IConversation } from '../interfaces/conversations';
import { conversationsService } from '../services';
import { IConversationsAction } from '../interfaces/actions';

export const getConversations = () => async (dispatch: Dispatch) => {
    dispatch(getConversationsRequest());

    try {
        const conversations = await conversationsService.getConversations();
        dispatch(getConversationsSuccess(conversations));
    } catch(error) {
        dispatch(getConversationsFailure(error.message));
    }
};

const getConversationsRequest = (): Action =>({
    type: GET_CONVERSATIONS_REQUEST
});

const getConversationsSuccess = (conversations: IConversation[]): IConversationsAction =>({
    type: GET_CONVERSATIONS_SUCCESS,
    payload: {
        conversations
    }
});

const getConversationsFailure = (errorMessage: string) =>({
    type: GET_CONVERSATIONS_FAILURE,
    payload: {
        alertMessage: errorMessage
    }
});

export const addNewConversation = (userIds: string[]) => async (dispatch: Dispatch) => {
    try {
        const newConversation = await conversationsService.addNewConversation(userIds);
        dispatch(addNewConversationSuccess(newConversation));
    } catch (error) {
        dispatch(addNewConversationFailure(error.message));
    }
};

const addNewConversationSuccess = (conversation: IConversation) => ({
    type: ADD_NEW_CONVERSATION_SUCCESS,
    payload: {
        conversation
    }
});

const addNewConversationFailure = (errorMessage: string) => ({
    type: ADD_NEW_CONVERSATION_FAILURE,
    payload: {
        alertMessage: errorMessage
    }
});

export const removeConversation = (_id: string) => async (dispatch: Dispatch) => {
    try {
        const { message } = await conversationsService.removeConversation(_id);
        dispatch(removeConversationSuccess(message));
    } catch (error) {
        dispatch(removeConversationFailure(error.message));
    }
};

const removeConversationSuccess = (deletionSuccessMessage: string) => ({
    type: REMOVE_CONVERSATION_SUCCESS,
    payload: {
        alertMessage: deletionSuccessMessage
    }
});

const removeConversationFailure = (errorMessage: string) => ({
    type: REMOVE_CONVERSATION_FAILURE,
    payload: {
        alertMessage: errorMessage
    }
});

