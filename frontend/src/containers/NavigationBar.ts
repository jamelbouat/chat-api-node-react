import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';

import { RootState } from '../interfaces';
import NavigationBar from '../components/NavigationBar';
import { ROUTES } from '../constants';
import { logoutAndRedirectToHome } from '../actions/login';

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: state.loginState.isAuthenticated
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
    logoutUser: () => {
        dispatch(logoutAndRedirectToHome());
    },
    redirectToProfile: () => {
        dispatch(push(ROUTES.PROFILE));
    },
    redirectToDashboard: () => {
        dispatch(push(ROUTES.DASHBOARD));
    },
    redirectToLogin: () => {
        dispatch(push(ROUTES.LOGIN));
    },
    redirectToRegister: () => {
        dispatch(push(ROUTES.REGISTER));
    }
});

export default withRouter(connect(
    mapStateToProps, mapDispatchToProps
)(NavigationBar));

