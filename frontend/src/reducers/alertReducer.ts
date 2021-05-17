import { CLEAR_ALERT_ERROR, SET_ALERT_ERROR, SET_ALERT_SUCCESS } from '../actions/types';
import { IAlertAction } from '../actions/alert';

const initialState = {
    alertType: null,
    alertMessage: null
};

export const alertReducer = (state = initialState, action: IAlertAction) => {
    switch (action.type) {
        case SET_ALERT_ERROR:
        case SET_ALERT_SUCCESS:
            return {
                alertType: action.payload.alertType,
                alertMessage: action.payload.alertMessage
            };

        case CLEAR_ALERT_ERROR:
            return {
                alertType: null,
                alertMessage: null
            };

        default:
            return state;
    }
};
