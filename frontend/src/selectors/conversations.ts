import { Selector } from 'react-redux';

import { RootState } from '../interfaces/state';
import { IConversation } from '../interfaces/conversations';
import { IAlert } from '../interfaces/alert';

const conversationsLoadingSelector: Selector<RootState, boolean> = state =>
    state.conversationsState.isLoading;

const conversationsSelector: Selector<RootState, IConversation[]> = (state) =>
    state.conversationsState.conversations;

const conversationsAlertInfoSelector: Selector<RootState, IAlert> = state =>
    state.conversationsState.alertInfo;

const conversationSelector = (state: RootState, _id:string): IConversation | undefined => {
    if (_id === '0') {
        return conversationsSelector(state)[0];
    }
    const conversations = conversationsSelector(state);
    return conversations.find((conversation: IConversation) => conversation._id === _id);
};

const defaultConversationSelector: Selector<RootState, any> = state => conversationsSelector(state)[0];

export {
    conversationsLoadingSelector,
    conversationsSelector,
    conversationsAlertInfoSelector,
    defaultConversationSelector,
    conversationSelector
};

// const conversationSelector = (state: RootState, _id: string) => {
// return createSelector(
//     [conversationsSelector],
//     conversations => conversations
//         .find((conversation: IConversation) => conversation._id === _id)
// );
// };

// OutputSelector<RootState, IConversation | undefined, (res: IConversation[]) =>
//     IConversation | undefined>
