import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import { loginReducer } from './loginReducer';
import { registerReducer } from './registerReducer';
import { refreshTokensReducer } from './refreshTokensReducer';
import { usersReducer } from './usersReducer';
import { conversationsReducer } from './conversationsReducer';
import { messagesReducer } from './messagesReducer';

const createRootReducer = (history: History): Reducer => combineReducers({
    router: connectRouter(history),
    registerState: registerReducer,
    loginState: loginReducer,
    tokensState: refreshTokensReducer,
    usersState: usersReducer,
    conversationsState: conversationsReducer,
    messagesState: messagesReducer
});

export default createRootReducer;
