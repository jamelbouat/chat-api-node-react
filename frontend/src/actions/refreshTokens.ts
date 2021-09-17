import { Action, Dispatch } from 'redux';
import { push } from 'connected-react-router';

import { refreshTokensService } from '../services';
import { ALERT_TYPE, ROUTES } from '../constants';
import { removeUserData, setLoginAlert } from './login';
import * as storage from '../utils/sessionStorage';
import {
    CLEAR_REFRESH_TOKENS_PROMISE,
    REMOVE_TOKENS,
    SET_INITIAL_TOKENS,
    SET_NEW_TOKENS,
    SET_REFRESH_TOKENS_PROMISE
} from './types';
import { ILoginResponseData } from '../interfaces/user';
import { ITokens } from '../interfaces/tokens';
import { routeChange } from './routes';

export const refreshTokens = async (dispatch: Dispatch, refreshToken: string): Promise<void> => {
    const refreshTokensPromise = async (): Promise<void> => {
        try {
            const newTokens: ITokens = await refreshTokensService.refreshTokens(refreshToken);
            dispatch(setNewTokens(newTokens));
            dispatch(clearRefreshTokensPromise());
            return Promise.resolve();

        } catch (error) {
            logoutAndRedirectToLogin(dispatch);
        }
    };

    const promise = refreshTokensPromise();
    dispatch(setRefreshTokensPromise(promise));
    return await promise;
};

const setNewTokens = (newTokens: ITokens) => ({
    type: SET_NEW_TOKENS, payload: newTokens
});

const setRefreshTokensPromise = (promise: Promise<void>) => ({
    type: SET_REFRESH_TOKENS_PROMISE,
    payload: {
        promise
    }
});

const clearRefreshTokensPromise = () => ({
    type: CLEAR_REFRESH_TOKENS_PROMISE
});

const logoutAndRedirectToLogin = (dispatch: Dispatch) => {
    dispatch(removeTokens());
    dispatch(removeUserData());
    storage.removeStateFromStorage();
    dispatch(setLoginAlert(ALERT_TYPE.INFO, 'Session timed out, try to connect !'));
    routeChange(ROUTES.LOGIN);
};

export const setInitialTokens = (userResponseData: ILoginResponseData) => ({
    type: SET_INITIAL_TOKENS,
    payload: {
        accessToken: userResponseData.accessToken,
        refreshToken: userResponseData.refreshToken
    }
});

export const removeTokens = (): Action => ({
    type: REMOVE_TOKENS
});
