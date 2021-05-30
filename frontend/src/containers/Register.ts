import { connect } from 'react-redux';
import Register from '../components/pages/Register';
import { IRegisterValues } from '../interfaces';
import { clearRegisterAlertInfo, registerUser } from '../actions/register';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../typings/redux';

const mapStateToProps = (state: RootState) => ({
    isLoading: state.registerState.isLoading,
    alertInfo: state.registerState.alertInfo
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
    registerUser: async (values: IRegisterValues) => {
        await dispatch(registerUser(values));
    },
    clearAlertInfo: () => {
        dispatch(clearRegisterAlertInfo());
    }
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(Register);
