import { CLEAR_ALERT_ERROR, SET_ALERT_ERROR, SET_ALERT_SUCCESS } from './types';
import { Action } from 'redux';

export enum ALERT_TYPE {
    LOGIN_FAIL = 'LOGIN_FAIL',
    REGISTER_FAIL = 'REGISTER_FAIL',
    REGISTER_SUCCESS = 'REGISTER_SUCCESS'
}

export interface IAlertAction extends Action {
    payload: {
        alertType: ALERT_TYPE,
        alertMessage: string
    }
}

export const setAlertError = (errorType: ALERT_TYPE, errorMessage: string): IAlertAction => (
    {
        type: SET_ALERT_ERROR,
        payload: {
            alertType: errorType,
            alertMessage: errorMessage
        }
    }
);

export const setAlertSuccess = (successType: ALERT_TYPE, successMessage: string): IAlertAction => (
    {
        type: SET_ALERT_SUCCESS,
        payload: {
            alertType: successType,
            alertMessage: successMessage
        }
    }
);

export const clearAlertError = (): Action => (
    {
        type: CLEAR_ALERT_ERROR
    }
);
