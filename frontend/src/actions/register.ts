import { Action, Dispatch } from 'redux';

import { CLEAR_REGISTER_ALERT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from './types';
import { userService } from '../services';
import { ALERT_TYPE, ROUTES } from '../constants';
import { setLoginAlert } from './login';
import { IRegisterFormValues } from '../interfaces/user';
import { routeChange } from './routes';

export const registerUser = (values: IRegisterFormValues) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(registerRequest());

    try {
        const { message } = await userService.registerUser(values);
        dispatch(registerSuccess());
        dispatch(setLoginAlert(ALERT_TYPE.SUCCESS, message));
        dispatch(routeChange(ROUTES.LOGIN));

    } catch (error) {
        dispatch(registerFailure(error.message));
    }
};

const registerRequest = () => ({
    type: REGISTER_REQUEST
});

const registerSuccess = () => ({
    type: REGISTER_SUCCESS
});

const registerFailure = (errorMessage: string) => ({
    type: REGISTER_FAILURE,
    payload: {
        alertMessage: errorMessage
    }
});

export const clearRegisterAlert = (): Action =>({
    type: CLEAR_REGISTER_ALERT
});

