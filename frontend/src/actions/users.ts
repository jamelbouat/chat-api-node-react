import { Dispatch } from 'redux';

import { GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS, SET_USERS_OFFLINE, SET_USERS_ONLINE } from './types';
import { userService } from '../services';
import { IUser } from '../interfaces/user';

const getUsers = () => async (dispatch: Dispatch): Promise<void> => {
    dispatch(getUsersRequest());

    try {
        const users = await userService.getUsers();
        dispatch(getUsersSuccess(users));

    } catch (error) {
        dispatch(getUsersFailure(error.message));
    }
};

const getUsersRequest = () => ({
    type: GET_USERS_REQUEST
});

const getUsersSuccess = (users: IUser[]) => ({
    type: GET_USERS_SUCCESS,
    payload: {
        users
    }
});

const getUsersFailure = (errorMessage: string) => ({
    type: GET_USERS_FAILURE,
    payload: {
        alertMessage: errorMessage
    }
});

const onSetUsersOnline = (userIds: string[]) => ({
    type: SET_USERS_ONLINE,
    payload: {
        userIds
    }
});

const onSetUsersOffline = (userIds: string[]) => ({
    type: SET_USERS_OFFLINE,
    payload: {
        userIds
    }
});

export {
    getUsers,
    onSetUsersOnline,
    onSetUsersOffline
};

