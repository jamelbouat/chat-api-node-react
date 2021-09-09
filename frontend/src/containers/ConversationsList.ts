import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { push } from 'connected-react-router';

import { RootState } from '../interfaces/state';
import ConversationsList from '../components/pages/conversations/sideBar/ConversationsList';
import { getConversations } from '../actions/conversations';
import { ROUTES } from '../constants';
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
        dispatch(push(ROUTES.CONVERSATIONS.replace(':id', _id)));
    }
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(ConversationsList);
