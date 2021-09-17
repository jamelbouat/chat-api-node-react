import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import NavigationBar from '../components/NavigationBar';
import { logoutAndRedirectToHome } from '../actions/login';
import { RootState } from '../interfaces/state';
import { routeChange } from '../actions/routes';
import { ROUTES } from '../constants';

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: state.loginState.isAuthenticated
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
    redirectToDashboard: () => {
        dispatch(routeChange(ROUTES.DASHBOARD));
    },
    redirectToConversations: () => {
        dispatch(routeChange(ROUTES.CONVERSATIONS, { ':id': '0' }));
    },
    redirectToProfile: () => {
        dispatch(routeChange(ROUTES.PROFILE));
    },
    logoutUser: () => {
        dispatch(logoutAndRedirectToHome());
    },
    redirectToLogin: () => {
        dispatch(routeChange(ROUTES.LOGIN));
    },
    redirectToRegister: () => {
        dispatch(routeChange(ROUTES.REGISTER));
    }
});

export default withRouter(connect(
    mapStateToProps, mapDispatchToProps
)(NavigationBar));

