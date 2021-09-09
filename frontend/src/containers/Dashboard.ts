import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { getUsers } from '../actions/users';
import { RootState } from '../interfaces/state';
import Dashboard from '../components/pages/dashboard';
import { connectToSocketService } from '../actions/messages';

const mapStateToProps = (state: RootState) => ({
    isLoading: state.usersState.isLoading,
    users: state.usersState.users,
    alertInfo: state.usersState.alertInfo
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
    getUsers: async () => {
        await dispatch(getUsers());
    },
    connectToSocketService: () => {
        dispatch(connectToSocketService);
    }
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(Dashboard);
