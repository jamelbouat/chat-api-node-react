import { connect } from 'react-redux';
import Register from '../components/pages/Register';
import { IRegisterValues } from '../interfaces';
import { registerUser } from '../actions/register';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../typings/redux';

const mapStateToProps = (state: RootState) => ({
    isLoading: state.registerState.isLoading,
    alert: state.alert
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
    registerUser: (values: IRegisterValues) => {
        dispatch(registerUser(values));
    }
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(Register);