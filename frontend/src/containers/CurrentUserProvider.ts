import { Action } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState } from '../interfaces/state';
import { CurrentUserContextProvider } from '../context/CurrentUserContext';
import { currentUserSelector } from '../selectors/currentUser';

const mapStateToProps = (state: RootState) => ({
    currentUser: currentUserSelector(state)
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(CurrentUserContextProvider);
