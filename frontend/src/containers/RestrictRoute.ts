import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import { RootState } from '../interfaces';
import RestrictRoute from '../routes/RestrictRoute';

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: state.loginState.isAuthenticated
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
});

export default connect<any, any, any, RootState>(
    mapStateToProps, mapDispatchToProps
)(RestrictRoute);
