import { Action } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState } from '../interfaces/state';
import { CurrentUserProvider } from '../context/CurrentUserProvider';

const mapStateToProps = (state: RootState) => ({
    currentUser: state.loginState.user
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(CurrentUserProvider);
