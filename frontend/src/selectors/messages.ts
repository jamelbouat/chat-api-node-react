import { Selector } from 'react-redux';

import { RootState } from '../interfaces/state';
import { IReceivedMessage } from '../interfaces/conversations';
import { conversationsSelector } from './conversations';

const messagesSelector: Selector<RootState, IReceivedMessage[]> = (state) =>
    state.messagesState.messages;

const conversationMessagesSelector = (state: RootState, conversationId: string): IReceivedMessage[] | [] => {
    // const conversations = conversationsSelector(state);
    // const conversation = conversations.find(conversation => conversation._id === conversationId);
    // return conversation ? conversation.messages : [];
    return[];
};

export {
    messagesSelector,
    conversationMessagesSelector
};
