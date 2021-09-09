import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import ChatConversation from '../components/pages/conversations/chatContainer/ChatConversation';
import { RootState } from '../interfaces/state';
import { conversationMessagesSelector } from '../selectors/messages';
import { IConversation } from '../interfaces/conversations';
import { getConversationMessages } from '../actions/messages';

const mapStateToProps = (state: RootState, ownProps: { currentConversation: IConversation }) => {
    // const conversationId = ownProps.currentConversation._id;
    // return {
    //     messages: conversationMessagesSelector(state, conversationId)
    // };
    return {};
};

const mapDispatchTopProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
    // getConversationMessages: async (_id: string) => {
    //     await dispatch(getConversationMessages(_id));
    // }
});

export default connect(
    mapStateToProps, mapDispatchTopProps
)(ChatConversation);
