import { Action, Dispatch } from 'redux';
import { push } from 'connected-react-router';

import { ILoginResponseData, ILoginValues, IRegisterAction } from '../interfaces';
import { userService } from '../services';
import * as storage from '../utils/sessionStorage';
import { removeTokens, setInitialTokens } from './refreshTokens';
import { ALERT_TYPE, ROUTES } from '../constants';
import {
    CLEAR_LOGIN_ALERT,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REMOVE_USER_DATA,
    SET_LOGIN_ALERT
} from './types';

export const loginUser = (values: ILoginValues) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(loginRequest());

    try {
        const userResponseData = await userService.loginUser(values);
        dispatch(setInitialTokens(userResponseData));
        dispatch(loginSuccess(userResponseData));
        // dispatch(push(ROUTES.DASHBOARD));

    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

const loginRequest = () => ({
    type: LOGIN_REQUEST
});

const loginSuccess = (userResponseData: ILoginResponseData) => ({
    type: LOGIN_SUCCESS,
    payload: {
        user: userResponseData.user
    }
});

const loginFailure = (errorMessage: string) => ({
    type: LOGIN_FAILURE,
    payload: {
        alertMessage: errorMessage
    }
});

export const removeUserData = (): Action => ({
    type: REMOVE_USER_DATA
});

export const setLoginAlert = (alertType: ALERT_TYPE, alertMessage: string): IRegisterAction => ({
    type: SET_LOGIN_ALERT,
    payload: {
        alertType,
        alertMessage
    }
});

export const clearLoginAlert = (): Action =>({
    type: CLEAR_LOGIN_ALERT
});

export const logoutAndRedirectToHome = () => (dispatch: Dispatch): void => {
    dispatch(removeTokens());
    dispatch(removeUserData());
    storage.removeStateFromStorage();
    dispatch(push(ROUTES.HOME));
};
