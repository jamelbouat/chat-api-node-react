import { ALERT_TYPE } from '../constants';
import {
    CLEAR_LOGIN_ALERT,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REMOVE_USER_DATA, SET_LOGIN_ALERT,
} from '../actions/types';
import { ILoginAction } from '../interfaces/actions';

const initialState = {
    isLoading: false,
    user: null,
    isAuthenticated: false,
    alertInfo: {
        alertType: null,
        alertMessage: null
    }
};

const loginReducer = (state = initialState, action: ILoginAction) => {
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
                    alertType: ALERT_TYPE.ERROR,
                    alertMessage: action.payload.alertMessage
                }
            };

        case REMOVE_USER_DATA:
            return {
                ...initialState
            };

        case SET_LOGIN_ALERT:
            return {
                ...state,
                alertInfo: {
                    alertType: action.payload.alertType,
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

export { loginReducer };
