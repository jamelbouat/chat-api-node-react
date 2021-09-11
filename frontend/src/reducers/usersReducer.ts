import {
    GET_USERS_FAILURE,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    SET_USERS_OFFLINE,
    SET_USERS_ONLINE
} from '../actions/types';
import { ALERT_TYPE } from '../constants';
import { IUsersAction } from '../interfaces/actions';
import { IUser } from '../interfaces/user';

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

        case SET_USERS_ONLINE:
            return {
                ...state,
                users: changeUsersStatus(state.users, action.payload.userIds)
            };

        case SET_USERS_OFFLINE:
            return {
                ...state,
                users: changeUsersStatus(state.users, action.payload.userIds)
            };

        default:
            return state;
    }
};

const changeUsersStatus = (users: IUser[], userIds: string[]): IUser[] => {
    return users.map(user => {
        if (userIds.includes(user._id)) {
            return { ...user, online: !user.online };
        }
        return user;
    });
};
