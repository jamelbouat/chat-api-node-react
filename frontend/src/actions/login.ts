import { ILoginResponseData, ILoginValues } from '../interfaces';
import { Dispatch } from 'redux';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_USER, REMOVE_TOKENS, SET_INITIAL_TOKENS } from './types';
import { userService } from '../services/userService';
import { ALERT_TYPE, setAlertError } from './alert';
import * as storage from '../utils/localStorage';

export const loginUser = (values: ILoginValues) => async (dispatch: Dispatch) => {
    dispatch(loginRequest());
    try {
        const user = await userService.loginUser(values);
        console.log('user==',user);
        storage.saveTokensToStorage({
            accessToken: user.accessToken,
            refreshToken: user.refreshToken
        });

        dispatch(setInitialTokens(user));

        dispatch(loginSuccess(user));
        // redirect to home page if success
    } catch (error) {
        dispatch(loginFailure());
        dispatch(setAlertError(ALERT_TYPE.LOGIN_FAIL, error.message));
    }
};

const loginRequest = () => (
    { type: LOGIN_REQUEST }
);

const loginSuccess = (user: ILoginResponseData) => (
    { type: LOGIN_SUCCESS, payload: user.user }
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

const logoutUser = () => (dispatch: Dispatch): void => {
    storage.removeTokens();
    dispatch({ type: REMOVE_TOKENS });
    dispatch({ type: LOGOUT_USER });
};
