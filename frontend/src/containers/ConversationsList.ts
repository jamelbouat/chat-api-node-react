import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import { RootState } from '../interfaces/state';
import ConversationsList from '../components/pages/conversations/sideBar/ConversationsList';
import {
    changeCurrentConversation,
    clearConversationsAlertInfo,
    getConversations,
    removeConversation
} from '../actions/conversations';
import {
    conversationsAlertInfoSelector,
    conversationsLoadingSelector,
    conversationsSelector
} from '../selectors/conversations';

const mapStateToProps = (state: RootState) => ({
    isLoading: conversationsLoadingSelector(state),
    conversations: conversationsSelector(state),
    alertInfo: conversationsAlertInfoSelector(state)
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
    getConversations: async () => {
        await dispatch(getConversations);
    },
    changeCurrentConversation: (_id: string) => {
        dispatch(changeCurrentConversation(_id));
    },
    removeConversation: async (_id: string) => {
        await dispatch(removeConversation(_id));
    },
    clearConversationsAlertInfo: () => {
        dispatch(clearConversationsAlertInfo());
    }
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(ConversationsList);
