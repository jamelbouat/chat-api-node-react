import { Action, Dispatch } from 'redux';

import { userService } from '../services';
import * as storage from '../utils/sessionStorage';
import { removeTokens, setInitialTokens } from './refreshTokens';
import { ALERT_TYPE, ROUTES } from '../constants';
import {
    CLEAR_LOGIN_ALERT, LOGIN_FAILURE,
    LOGIN_REQUEST, LOGIN_SUCCESS,
    REMOVE_USER_DATA, SET_LOGIN_ALERT
} from './types';
import { ILoginResponseData, ILoginFormValues } from '../interfaces/user';
import { IRegisterAction } from '../interfaces/actions';
import { removeSocketConnection } from './messages';
import { removeConversationsFromStore } from './conversations';
import { routeChange } from './routes';

const loginUser = (values: ILoginFormValues) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(loginRequest());

    try {
        const userResponseData = await userService.loginUser(values);
        dispatch(setInitialTokens(userResponseData));
        dispatch(loginSuccess(userResponseData));
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

const removeUserData = (): Action => ({
    type: REMOVE_USER_DATA
});

const setLoginAlert = (alertType: ALERT_TYPE, alertMessage: string): IRegisterAction => ({
    type: SET_LOGIN_ALERT,
    payload: {
        alertType,
        alertMessage
    }
});

const clearLoginAlert = (): Action =>({
    type: CLEAR_LOGIN_ALERT
});

const logoutAndRedirectToHome = () => (dispatch: Dispatch): void => {
    dispatch(removeTokens());
    dispatch(removeUserData());
    dispatch(removeSocketConnection());
    dispatch(removeConversationsFromStore());
    storage.removeStateFromStorage();
    dispatch(routeChange(ROUTES.HOME));
};

export {
    loginUser,
    removeUserData,
    setLoginAlert,
    clearLoginAlert,
    logoutAndRedirectToHome
};


