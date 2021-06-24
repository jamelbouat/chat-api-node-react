import { IUsersAction } from '../interfaces';
import { GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS } from '../actions/types';
import { ALERT_TYPE } from '../constants';

const initialState = {
    isLoading: false,
    users: [],
    alertInfo: {
        alertType: null,
        alertMessage: null
    }
};

export const usersReducer = (state = initialState, action: IUsersAction) => {
    switch (action.type){
        case GET_USERS_REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case GET_USERS_SUCCESS:
            return {
                isLoading: false,
                users: action.payload.users,
                alertInfo: {
                    alertType: null,
                    alertMessage: null
                }
            };

        case GET_USERS_FAILURE:
            return {
                isLoading: false,
                users: null,
                alertInfo: {
                    alertType: ALERT_TYPE.ERROR,
                    alertMessage: action.payload.alertMessage
                }
            };

        default:
            return state;
    }
};
