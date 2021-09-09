import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import RestrictRoute from '../routes/RestrictRoute';
import { RootState } from '../interfaces/state';
import { isUserAuthenticatedSelector } from '../selectors/users';

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: isUserAuthenticatedSelector(state)
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
});

export default connect<any, any, any, RootState>(
    mapStateToProps, mapDispatchToProps
)(RestrictRoute);
