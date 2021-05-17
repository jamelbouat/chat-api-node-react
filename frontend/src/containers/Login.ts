import { connect } from 'react-redux';
import Login from '../components/pages/Login';
import {RootState} from '../../typings/redux';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {ILoginValues } from '../interfaces';
import {loginUser} from '../actions/login';

const mapStateToProps = (state: RootState) => ({
    isLoading: state.loginState.isLoading,
    user: state.loginState.user,
    isAuthenticated: state.loginState.isAuthenticated,
    alert: state.alert
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
    loginUser: async (values: ILoginValues) => {
        await dispatch(loginUser(values));
    }
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(Login);
