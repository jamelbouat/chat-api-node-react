import { compose } from 'redux';
import { store } from '../src';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export type RootState = ReturnType<typeof store.getState>;
