import { CLEAR_REGISTER_ALERT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from '../actions/types';
import { ALERT_TYPE } from '../constants';
import { IRegisterAction } from '../interfaces';

const initialState = {
    isLoading: false,
    alertInfo: {
        alertType: null,
        alertMessage: null
    }
};

const registerReducer = (state = initialState, action: IRegisterAction) => {
    switch (action.type){
        case REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case REGISTER_SUCCESS:
        case CLEAR_REGISTER_ALERT:
            return {
                ...initialState
            };

        case REGISTER_FAILURE:
            return {
                isLoading: false,
                alertInfo: {
                    alertType: ALERT_TYPE.ERROR,
                    alertMessage: action.payload.alertMessage
                }
            };

        default:
            return state;
    }
};

export { registerReducer };
