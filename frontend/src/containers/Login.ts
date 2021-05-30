import { connect } from 'react-redux';
import Login from '../components/pages/Login';
import { RootState } from '../../typings/redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { ILoginValues } from '../interfaces';
import { clearLoginAlertInfo, loginUser } from '../actions/login';

const mapStateToProps = (state: RootState) => ({
    isLoading: state.loginState.isLoading,
    alertInfo: state.loginState.alertInfo
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
    loginUser: async (values: ILoginValues) => {
        await dispatch(loginUser(values));
    },
    clearAlertInfo: () => {
        dispatch(clearLoginAlertInfo());
    }
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(Login);
