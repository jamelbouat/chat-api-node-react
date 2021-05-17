import {Action, Dispatch, Middleware, MiddlewareAPI} from 'redux';
import { refreshTokens } from '../actions/refreshTokens';

export const jwtMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
    const state = store.getState().tokenState;
    const accessToken = state.accessToken && state.accessToken;
    const tokenExpiresAt = accessToken.expiresAt && accessToken.expiresAt;
    const refreshTokensPromise = state.refreshTokensPromise;
    const dateNow = Date.now();
    const isTokenStillValid = (tokenExpiresAt - dateNow) > 6000;

    if(typeof action !== 'function' || !accessToken || !tokenExpiresAt || isTokenStillValid) {
        return next(action);
    }

    (async () => {
        refreshTokensPromise ?
            await refreshTokensPromise :
            await refreshTokens();

        next(action);
    })();
};
