import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_USER} from '../actions/types';
import { IUserAction } from '../interfaces';

const initialState = {
    isLoading: false,
    user: null,
    isAuthenticated: false
};

export const loginReducer = (state = initialState, action: IUserAction) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case LOGIN_SUCCESS:
            return {
                ...state ,
                isLoading: false,
                user: action.payload.user,
                isAuthenticated: true
            };

        case LOGIN_FAILURE:
        case LOGOUT_USER:
            return {
                ...state,
                isLoading: false,
                user: null,
                isAuthenticated: false
            };

        default:
            return state;

    }
};
