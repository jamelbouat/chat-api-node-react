import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import Register from '../components/pages/Register';

import { clearRegisterAlert, registerUser } from '../actions/register';
import { IRegisterFormValues } from '../interfaces/user';
import { RootState } from '../interfaces/state';

const mapStateToProps = (state: RootState) => ({
    isLoading: state.registerState.isLoading,
    alertInfo: state.registerState.alertInfo
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
    registerUser: async (values: IRegisterFormValues) => {
        await dispatch(registerUser(values));
    },
    clearRegisterAlert: () => {
        dispatch(clearRegisterAlert());
    }
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(Register);
