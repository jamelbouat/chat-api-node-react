import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';

import NavigationBar from '../components/NavigationBar';
import { ROUTES } from '../constants';
import { logoutAndRedirectToHome } from '../actions/login';
import { RootState } from '../interfaces/state';

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: state.loginState.isAuthenticated
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
    redirectToDashboard: () => {
        dispatch(push(ROUTES.DASHBOARD));
    },
    redirectToConversations: () => {
        dispatch(push(ROUTES.CONVERSATIONS.replace(':id', '0')));
    },
    redirectToProfile: () => {
        dispatch(push(ROUTES.PROFILE));
    },
    logoutUser: () => {
        dispatch(logoutAndRedirectToHome());
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

