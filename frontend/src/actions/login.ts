import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

import { ILoginResponseData, ILoginValues } from '../interfaces';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_USER, REMOVE_TOKENS, SET_INITIAL_TOKENS } from './types';
import { userService } from '../services/userService';
import { ALERT_TYPE, setAlertInfoToError } from './alertInfo';
import { ROUTES } from '../constants';
import * as storage from '../utils/sessionStorage';

export const loginUser = (values: ILoginValues) => async (dispatch: Dispatch): Promise<void> => {
    dispatch(loginRequest());

    try {
        const user = await userService.loginUser(values);
        dispatch(setInitialTokens(user));
        dispatch(loginSuccess(user));
        // dispatch(push(ROUTES.DASHBOARD));

    } catch (error) {
        dispatch(loginFailure());
        dispatch(setAlertInfoToError(ALERT_TYPE.LOGIN_FAIL, error.message));
    }
};

const loginRequest = () => (
    { type: LOGIN_REQUEST }
);

const loginSuccess = (user: ILoginResponseData) => (
    { type: LOGIN_SUCCESS, payload: user }
);

const loginFailure = () => (
    { type: LOGIN_FAILURE }
);

const setInitialTokens = (user: ILoginResponseData) => ({
    type: SET_INITIAL_TOKENS,
    payload: {
        accessToken: user.accessToken,
        refreshToken: user.refreshToken
    }
});

export const logoutUser = () => (dispatch: Dispatch): void => {
    storage.removeStateFromStorage();
    dispatch({ type: REMOVE_TOKENS });
    dispatch({ type: LOGOUT_USER });
    dispatch(push(ROUTES.HOME));
};
