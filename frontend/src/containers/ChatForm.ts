import { Action } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState } from '../interfaces/state';
import { sendMessage } from '../actions/messages';
import ChatForm, { IMessageValues } from '../components/pages/conversations/chatContainer/ChatForm';

const mapStateToProps = (state: RootState) => ({
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>, ownProps: any) => {
    const conversationId = ownProps.currentConversation._id;

    return {
        sendMessage: (message: IMessageValues) => {
            conversationId && dispatch(sendMessage({ conversationId, content: message.content }));
        }
    };
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(ChatForm);
