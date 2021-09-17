import { Action } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState } from '../interfaces/state';
import { sendMessage } from '../actions/messages';
import ChatForm from '../components/pages/conversations/chatContainer/ChatForm';
import { IMessageFormValues } from '../interfaces/conversations';

const mapStateToProps = (state: RootState) => ({
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>, ownProps: any) => {
    const conversationId = ownProps.currentConversation._id;

    return {
        sendMessage: (values: IMessageFormValues) => {
            conversationId && dispatch(sendMessage(conversationId, values));
        }
    };
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(ChatForm);
