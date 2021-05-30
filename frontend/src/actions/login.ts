import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

import { ILoginResponseData, ILoginValues } from '../interfaces';
import {
    CLEAR_LOGIN_ALERT,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_USER,
    REMOVE_TOKENS,
    SET_INITIAL_TOKENS, SET_LOGIN_ALERT_SUCCESS,
} from './types';
import { userService } from '../services/userService';
import { ROUTES } from '../constants';
import * as storage from '../utils/sessionStorage';
import { setInitialTokens } from './refreshTokens';

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

const loginRequest = () => (
    { type: LOGIN_REQUEST }
);

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

export const setLoginAlertToSuccess = (successMessage: string) => ({
    type: SET_LOGIN_ALERT_SUCCESS,
    payload: {
        alertMessage: successMessage
    }
});

export const clearLoginAlertInfo = () =>({
    type: CLEAR_LOGIN_ALERT
});

export const logoutUser = () => (dispatch: Dispatch): void => {
    dispatch({ type: REMOVE_TOKENS });
    dispatch({ type: LOGOUT_USER });
    storage.removeStateFromStorage();
    dispatch(push(ROUTES.HOME));
};
