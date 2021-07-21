import { Action } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import Profile from '../components/pages/Profile';
import { RootState } from '../interfaces/state';

const mapStateToProps = (state: RootState) => ({
    user: state.loginState.user
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(Profile);
