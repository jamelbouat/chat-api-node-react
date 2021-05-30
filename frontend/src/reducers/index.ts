import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import { loginReducer } from './loginReducer';
import { registerReducer } from './registerReducer';
import { refreshTokensReducer } from './refreshTokensReducer';

const createRootReducer = (history: History): Reducer => combineReducers({
    router: connectRouter(history),
    registerState: registerReducer,
    loginState: loginReducer,
    tokenState: refreshTokensReducer
});

export default createRootReducer;
