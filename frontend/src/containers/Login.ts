import { Action } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import Login from '../components/pages/Login';
import { clearLoginAlert, loginUser } from '../actions/login';
import { ILoginValues } from '../interfaces/user';
import { RootState } from '../interfaces/state';

const mapStateToProps = (state: RootState) => ({
    isLoading: state.loginState.isLoading,
    alertInfo: state.loginState.alertInfo
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
    loginUser: async (values: ILoginValues) => {
        await dispatch(loginUser(values));
    },
    clearLoginAlert: () => {
        dispatch(clearLoginAlert());
    }
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(Login);
