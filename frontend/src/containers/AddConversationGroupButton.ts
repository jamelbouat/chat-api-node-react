import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState } from '../interfaces/state';
import AddConversationGroupButton from '../components/pages/conversations/sideBar/AddConversationGroupButton';
import { usersSelector } from '../selectors/users';
import { addNewConversation } from '../actions/conversations';

const mapStateToProps = (state: RootState) => ({
    users: usersSelector(state),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
    addNewConversation: async (userIds: string[]) => {
        await dispatch(addNewConversation([ ...userIds ]));
    }
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(AddConversationGroupButton);
