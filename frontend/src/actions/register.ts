import { IRegisterValues } from '../interfaces';
import { Dispatch } from 'redux';
import { CLEAR_REGISTER_ALERT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from './types';
import { userService } from '../services/userService';
import { ROUTES } from '../constants';
import { push } from 'connected-react-router';
import { setLoginAlertToSuccess } from './login';

export const registerUser = (values: IRegisterValues) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(registerRequest());

    try {
        const { message } = await userService.registerUser(values);
        dispatch(registerSuccess());
        dispatch(setLoginAlertToSuccess(message));
        dispatch(push(ROUTES.LOGIN));

    } catch (error) {
        dispatch(registerFailure(error.message));
    }
};

const registerRequest = () => (
    { type: REGISTER_REQUEST }
);

const registerSuccess = () => (
    { type: REGISTER_SUCCESS }
);

const registerFailure = (errorMessage: string) => ({
    type: REGISTER_FAILURE,
    payload: {
        alertMessage: errorMessage
    }
});

export const clearRegisterAlertInfo = () =>({
    type: CLEAR_REGISTER_ALERT
});

