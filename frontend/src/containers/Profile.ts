import { Action } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import Profile from '../components/pages/Profile';
import { RootState } from '../interfaces/state';
import { currentUserSelector } from '../selectors/users';

const mapStateToProps = (state: RootState) => ({
    currentUser: currentUserSelector(state)
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(Profile);
