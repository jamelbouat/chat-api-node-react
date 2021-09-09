import { Selector } from 'react-redux';

import { RootState } from '../interfaces/state';
import { IMessage } from '../interfaces/conversations';
import { conversationsSelector } from './conversations';

const messagesSelector: Selector<RootState, IMessage[]> = (state) =>
    state.messagesState.messages;

const conversationMessagesSelector = (state: RootState, conversationId: string): IMessage[] | [] => {
    // const conversations = conversationsSelector(state);
    // const conversation = conversations.find(conversation => conversation._id === conversationId);
    // return conversation ? conversation.messages : [];
    return[];
};

export {
    messagesSelector,
    conversationMessagesSelector
};
