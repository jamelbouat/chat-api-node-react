import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import { loginReducer } from './loginReducer';
import { registerReducer } from './registerReducer';
import { refreshTokensReducer } from './refreshTokensReducer';
import { usersReducer } from './usersReducer';

const createRootReducer = (history: History): Reducer => combineReducers({
    router: connectRouter(history),
    registerState: registerReducer,
    loginState: loginReducer,
    tokensState: refreshTokensReducer,
    usersState: usersReducer
});

export default createRootReducer;
