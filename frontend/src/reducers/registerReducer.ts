import {Action} from 'redux';
import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from '../actions/types';

const initialState = {
    isLoading: false,
};

const registerReducer = (state = initialState, action: Action) => {
    switch (action.type){
        case REGISTER_REQUEST:
            return {
                isLoading: true
            };

        case REGISTER_SUCCESS:
            return {
                isLoading: false
            };

        case REGISTER_FAILURE:
            return state;

        default:
            return state;
    }
};

export { registerReducer };
