import { CLEAR_ALERT, SET_ALERT_ERROR, SET_ALERT_SUCCESS } from '../actions/types';
import { IAlertAction } from '../actions/alertInfo';

const initialState = {
    alertType: null,
    alertMessage: null
};

export const alertInfoReducer = (state = initialState, action: IAlertAction) => {
    switch (action.type) {
        case SET_ALERT_ERROR:
        case SET_ALERT_SUCCESS:
            return {
                alertType: action.payload.alertType,
                alertMessage: action.payload.alertMessage
            };

        case CLEAR_ALERT:
            return {
                alertType: null,
                alertMessage: null
            };

        default:
            return state;
    }
};
