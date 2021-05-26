import { applyMiddleware, compose, createStore, Store } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';

import createRootReducer from './reducers';
import { jwtMiddleware } from './middlewares/jwtMiddleware';
import { ROUTES } from './constants';
import { getStateFromSessionStorage } from './utils/sessionStorage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createBrowserHistory({ basename: ROUTES.HOME });
const initialState = getStateFromSessionStorage() || {};

const middlewares = [
    jwtMiddleware,
    thunkMiddleware,
    routerMiddleware(history)
];

const configureStore = (): Store => {
    return createStore(
        createRootReducer(history),
        initialState,
        composeEnhancers(
            applyMiddleware(...middlewares)
        )
    );
};

export { history, configureStore };
