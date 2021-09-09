import { Dispatch } from 'redux';

import { GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS } from './types';
import { userService } from '../services';
import { IUser } from '../interfaces/user';

export const getUsers = () => async (dispatch: Dispatch) => {
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
