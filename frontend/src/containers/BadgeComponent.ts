import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import { RootState } from '../interfaces/state';
import { IConversationUser } from '../interfaces/conversations';
import BadgeComponent from '../components/BadgeComponent';
import { conversationUserStatusSelector } from '../selectors/users';

const mapStateToProps = (state: RootState, ownProps: { conversationUser: IConversationUser }) => {
    const conversationUser = ownProps.conversationUser;
    return {
        status: conversationUserStatusSelector(state, conversationUser._id),
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(BadgeComponent);


