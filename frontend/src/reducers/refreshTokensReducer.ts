import { Action } from 'redux';
import {
    CLEAR_REFRESH_TOKENS_PROMISE,
    REMOVE_TOKENS,
    SET_INITIAL_TOKENS,
    SET_NEW_TOKENS,
    SET_REFRESH_TOKENS_PROMISE
} from '../actions/types';
import { ITokens } from '../interfaces';

const initialState = {
    accessToken: null,
    refreshToken: null,
    refreshTokensPromise: null
};

interface ITokenAction extends Action {
    payload: ITokens & Promise<void>;
}

export const refreshTokensReducer = (state = initialState, action: ITokenAction) => {
    switch (action.type) {
        case SET_INITIAL_TOKENS:
        case SET_NEW_TOKENS:
            return {
                ...state,
                accessToken: {
                    token: action.payload.accessToken.token,
                    expiresAt: action.payload.accessToken.expiresAt,
                },
                refreshToken: action.payload.refreshToken
            };

        case REMOVE_TOKENS:
            return {
                ...state,
                accessToken: {
                    token: null,
                    expiresAt: null
                },
                refreshToken: null
            };

        case SET_REFRESH_TOKENS_PROMISE:
            return {
                ...state,
                refreshTokensPromise: action.payload
            };

        case CLEAR_REFRESH_TOKENS_PROMISE:
            return {
                ...state,
                refreshTokensPromise: null
            };

        default:
            return state;
    }
};
