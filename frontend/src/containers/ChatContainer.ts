import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { withRouter, RouteComponentProps } from 'react-router';

import { RootState } from '../interfaces/state';
import ChatContainer, { ParamsProps } from '../components/pages/conversations/chatContainer';
import { conversationSelector, conversationsLoadingSelector } from '../selectors/conversations';
import { IConversation } from '../interfaces/conversations';
import { joinConversationRoom } from '../actions/messages';
import { socketIdSelector } from '../selectors/socket';

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps<ParamsProps>) => {
    const conversationId = ownProps.match.params.id;
    return {
        isLoading: conversationsLoadingSelector(state),
        currentConversation: conversationSelector(state, conversationId),
        socketId: socketIdSelector(state)
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>, ownProps: RouteComponentProps) => ({
    setDefaultConversationPath: (_id: string) => {
        const newPath = ownProps.match.path.replace(':id', _id);
        ownProps.history.replace(newPath);
    },
    joinConversationRoom: (currentConversation: IConversation) => {
        joinConversationRoom(currentConversation);
    }
});

export default withRouter(connect(
    mapStateToProps, mapDispatchToProps
)(ChatContainer));




















