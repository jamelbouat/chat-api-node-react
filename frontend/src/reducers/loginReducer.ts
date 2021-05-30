import {
    CLEAR_LOGIN_ALERT,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_USER, SET_LOGIN_ALERT_SUCCESS,
} from '../actions/types';
import { ILoginAction } from '../interfaces';
import { ALERT_TYPE } from '../constants';

const initialState = {
    isLoading: false,
    user: null,
    isAuthenticated: false,
    alertInfo: {
        alertType: null,
        alertMessage: null
    }
};

export const loginReducer = (state = initialState, action: ILoginAction) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case LOGIN_SUCCESS:
            return {
                isLoading: false,
                user: action.payload.user,
                isAuthenticated: true,
                alertInfo: {
                    alertType: null,
                    alertMessage: null
                }
            };

        case LOGIN_FAILURE:
            return {
                isLoading: false,
                user: null,
                isAuthenticated: false,
                alertInfo: {
                    alertType: ALERT_TYPE.FAILURE,
                    alertMessage: action.payload.alertMessage
                }
            };

        case LOGOUT_USER:
            return {
                ...initialState
            };

        case SET_LOGIN_ALERT_SUCCESS:
            return {
                ...state,
                alertInfo: {
                    alertType: ALERT_TYPE.SUCCESS,
                    alertMessage: action.payload.alertMessage
                }
            };

        case CLEAR_LOGIN_ALERT:
            return {
                ...state,
                alertInfo: {
                    alertType: null,
                    alertMessage: null
                }
            };

        default:
            return state;
    }
};
