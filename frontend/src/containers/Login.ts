import { connect } from 'react-redux';
import Login from '../components/pages/Login';
import { RootState } from '../../typings/redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { ILoginValues } from '../interfaces';
import { loginUser } from '../actions/login';
import { clearAlertInfo } from '../actions/alertInfo';

const mapStateToProps = (state: RootState) => ({
    isLoading: state.loginState.isLoading,
    user: state.loginState.user,
    isAuthenticated: state.loginState.isAuthenticated,
    alertInfo: state.alertInfo
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
    loginUser: async (values: ILoginValues) => {
        await dispatch(loginUser(values));
    },
    clearAlert: () => {
        dispatch(clearAlertInfo());
    }
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(Login);
