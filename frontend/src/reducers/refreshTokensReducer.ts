import { ITokenAction } from '../interfaces';
import {
    CLEAR_REFRESH_TOKENS_PROMISE,
    REMOVE_TOKENS,
    SET_INITIAL_TOKENS,
    SET_NEW_TOKENS,
    SET_REFRESH_TOKENS_PROMISE
} from '../actions/types';

const initialState = {
    accessToken: {
        token: null,
        expiresAt: null
    },
    refreshToken: null,
    refreshTokensPromise: null
};

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
                ...initialState
            };

        case SET_REFRESH_TOKENS_PROMISE:
            return {
                ...state,
                refreshTokensPromise: action.payload.promise
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
