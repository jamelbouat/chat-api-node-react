import { Action, Dispatch, Middleware } from 'redux';

import { refreshTokens } from '../actions/refreshTokens';
import { ThunkDispatch } from 'redux-thunk';
import { CLEAR_REFRESH_TOKENS_PROMISE, SET_NEW_TOKENS, SET_REFRESH_TOKENS_PROMISE } from '../actions/types';
import { RootState } from '../interfaces/state';

export const jwtMiddleware: Middleware = ({ getState, dispatch } : { getState: RootState, dispatch: ThunkDispatch<RootState, any, Action> }) =>
    (next: Dispatch) => (action: Action) => {
        const tokensState = getState().tokensState;
        const accessToken = tokensState && tokensState.accessToken && tokensState.accessToken;
        const refreshToken = tokensState && tokensState.refreshToken;
        const tokenExpiresAt = accessToken && accessToken.expiresAt && accessToken.expiresAt;
        const refreshTokensPromise = tokensState.refreshTokensPromise;
        const dateNow = Date.now();
        const isTokenStillValid = (tokenExpiresAt - dateNow) > 6000; // 6000ms = 6s

        if (!accessToken.token || isTokenStillValid ||
            action.type === SET_REFRESH_TOKENS_PROMISE ||
            action.type === CLEAR_REFRESH_TOKENS_PROMISE ||
            action.type === SET_NEW_TOKENS) {
            return next(action);
        }

        (async () => {
            refreshTokensPromise ?
                await refreshTokensPromise :
                await refreshTokens(dispatch, refreshToken);
            return next(action);
        })();
    };
