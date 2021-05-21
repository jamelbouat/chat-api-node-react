import { Action } from 'redux';
import {
    CLEAR_REFRESH_TOKENS_PROMISE,
    REMOVE_TOKENS,
    SET_INITIAL_TOKENS,
    SET_NEW_TOKENS,
    SET_REFRESH_TOKENS_PROMISE
} from '../actions/types';
import { getTokensFromStorage } from '../utils/localStorage';

const { accessToken, refreshToken } = getTokensFromStorage();

const initialState = {
    accessToken,
    refreshToken,
    refreshTokensPromise: null
};

interface ITokenAction extends Action {
    payload : {
        accessToken: {
            token: string,
            expiresAt: string
        }
        refreshToken: string;
    };
}

export const refreshTokensReducer = (state = initialState, action: ITokenAction) => {
    switch (action.type) {
        case SET_INITIAL_TOKENS:
        case SET_NEW_TOKENS:
            return {
                ...action.payload
            };

        case REMOVE_TOKENS:
            return {
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
