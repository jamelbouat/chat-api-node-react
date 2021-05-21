import { Dispatch } from 'redux';
import { refreshTokensService } from '../services';
import { CLEAR_REFRESH_TOKENS_PROMISE, REMOVE_TOKENS, SET_NEW_TOKENS, SET_REFRESH_TOKENS_PROMISE } from './types';
import { ITokens } from '../interfaces';
import * as storage from '../utils/localStorage';

export const refreshTokens = () => (dispatch: Dispatch): Promise<void> => {
    const refreshTokensPromise = async () => {
        try {
            const newTokens: ITokens = await refreshTokensService.refreshTokens();
            dispatch(setNewTokens(newTokens));
            dispatch(clearRefreshTokensPromise());

            return Promise.resolve();

        } catch(error) {
            removeTokens();
            // redirect to login page

            return Promise.reject();
        }
    };

    const promise = refreshTokensPromise();
    setRefreshTokensPromise(promise);

    return promise;
};

const removeTokens = () =>(dispatch: Dispatch): void => {
    storage.removeTokens();
    dispatch({ type: REMOVE_TOKENS });
};

const setNewTokens = (newTokens: ITokens) => (
    { type: SET_NEW_TOKENS, payload: newTokens }
);

const setRefreshTokensPromise = (promise: Promise<void>) => (
    { type: SET_REFRESH_TOKENS_PROMISE, payload: promise }
);

const clearRefreshTokensPromise = () => (
    { type: CLEAR_REFRESH_TOKENS_PROMISE }
);
