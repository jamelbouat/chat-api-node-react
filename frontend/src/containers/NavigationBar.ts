import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { RootState } from '../../typings/redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import NavigationBar from '../components/NavigationBar';
import { logoutUser } from '../actions/login';
import { push } from 'connected-react-router';
import { ROUTES } from '../constants';

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: state.loginState.isAuthenticated
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
    logoutUser: () => {
        dispatch(logoutUser());
    },
    viewProfile: () => {
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

