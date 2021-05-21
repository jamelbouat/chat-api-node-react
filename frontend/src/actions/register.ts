import { IRegisterValues } from '../interfaces';
import { Dispatch } from 'redux';
import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from './types';
import { userService } from '../services/userService';
import { ALERT_TYPE, setAlertError, setAlertSuccess } from './alert';

export const registerUser = (values: IRegisterValues) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(registerRequest());

    try {
        const { message } = await userService.registerUser(values);
        dispatch(registerSuccess());
        dispatch(setAlertSuccess(ALERT_TYPE.REGISTER_SUCCESS, message));

    } catch (error) {
        dispatch(setAlertError(ALERT_TYPE.REGISTER_FAIL, error.message));
        dispatch(registerFailure());
    }
};

const registerRequest = () => (
    { type: REGISTER_REQUEST }
);

const registerSuccess = () => (
    { type: REGISTER_SUCCESS }
);

const registerFailure = () => (
    { type: REGISTER_FAILURE }
);

