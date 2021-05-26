import { IRegisterValues } from '../interfaces';
import { Dispatch } from 'redux';
import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from './types';
import { userService } from '../services/userService';
import { ALERT_TYPE, setAlertInfoToError, setAlertInfoToSuccess } from './alertInfo';
import { ROUTES } from '../constants';
import { push } from 'connected-react-router';

export const registerUser = (values: IRegisterValues) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(registerRequest());

    try {
        const { message } = await userService.registerUser(values);
        dispatch(registerSuccess());
        dispatch(setAlertInfoToSuccess(ALERT_TYPE.REGISTER_SUCCESS, message));
        dispatch(push(ROUTES.LOGIN));

    } catch (error) {
        dispatch(setAlertInfoToError(ALERT_TYPE.REGISTER_FAIL, error.message));
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
