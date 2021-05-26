import { Action, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { refreshTokens } from '../actions/refreshTokens';

export const jwtMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
    const tokenState = store.getState().tokenState;
    const accessToken = tokenState && tokenState.accessToken && tokenState.accessToken;
    const tokenExpiresAt = accessToken && accessToken.expiresAt && accessToken.expiresAt;
    const refreshTokensPromise = tokenState.refreshTokensPromise;
    const dateNow = Date.now();
    const isTokenStillValid = (tokenExpiresAt - dateNow) > 6000; // 6000ms = 6s

    if(typeof action !== 'function' || !accessToken || !tokenExpiresAt || isTokenStillValid) {
        return next(action);
    }

    (async () => {
        refreshTokensPromise ?
            await refreshTokensPromise :
            await refreshTokens();

        return next(action);
    })();
};
