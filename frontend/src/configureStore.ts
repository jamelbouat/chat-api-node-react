import { applyMiddleware, compose, createStore, Store } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';

import createRootReducer from './reducers';
import {jwtMiddleware} from './middlewares/jwtMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createBrowserHistory();

const middlewares = [
    jwtMiddleware,
    thunkMiddleware,
    routerMiddleware(history)
];

const configureStore = (): Store => {
    return createStore(
        createRootReducer(history),
        composeEnhancers(
            applyMiddleware(...middlewares)
        )
    );
};

export { history, configureStore };
