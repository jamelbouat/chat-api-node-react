import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import RestrictRoute from '../routes/RestrictRoute';
import { RootState } from '../interfaces/state';

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: state.loginState.isAuthenticated
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
});

export default connect<any, any, any, RootState>(
    mapStateToProps, mapDispatchToProps
)(RestrictRoute);
